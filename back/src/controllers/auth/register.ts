import { Middleware, Context } from 'koa'
import { prisma } from '../../prisma/client'
import { ValidationError } from '../../helpers/errors'
import { UserRegister } from '../../schemas/users/userRegisterSchema'
import { processMedia } from '../../helpers/processMedia'
import { handleSSO } from '../../helpers/handleSso'

export const registerController: Middleware = async (ctx: Context) => {
  const {
    dni,
    password,
    name,
    email,
    confirmPassword,
    itineraryId,
  }: UserRegister = ctx.request.body

  const media = ctx.file

  const { status, data } = await handleSSO('register', {
    dni,
    password,
    confirmPassword,
    email,
    itineraryId,
  })
  if (status !== 200) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new ValidationError(data.message)
  }

  const user = await prisma.user.create({
    data: {
      id: data.id,
      name,
    },
  })

  if (media) {
    const { mediaId } = await processMedia(media, user.id)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        avatarId: mediaId,
      },
    })
  }

  ctx.status = 204
}
