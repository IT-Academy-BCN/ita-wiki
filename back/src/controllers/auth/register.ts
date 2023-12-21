import { Context, Middleware } from 'koa'
import { processMedia } from '../../helpers/processMedia'
import { ssoHandler } from '../../helpers/sso/ssoHandler'
import { prisma } from '../../prisma/client'
import { UserRegister } from '../../schemas/users/userRegisterSchema'

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

  const { id } = await ssoHandler.register({
    dni,
    password,
    confirmPassword,
    email,
    itineraryId,
  })

  const user = await prisma.user.create({
    data: {
      id,
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
