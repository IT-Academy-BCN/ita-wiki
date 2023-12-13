import { Middleware, Context } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError, ValidationError } from '../../helpers/errors'
import { UserRegister } from '../../schemas/users/userRegisterSchema'
import { processMedia } from '../../helpers/processMedia'
import { appConfig } from '../../config/config'

export const registerController: Middleware = async (ctx: Context) => {
  const {
    dni,
    password,
    name,
    email,
    confirmPassword,
    specialization,
    itineraryId,
  }: UserRegister = ctx.request.body

  const media = ctx.file

  const existingCategory = await prisma.category.findUnique({
    where: { id: specialization },
  })

  if (!existingCategory) {
    throw new NotFoundError('Category not found')
  }

  const fetchSSO = await fetch(`${appConfig.ssoUrl}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dni,
      password,
      confirmPassword,
      email,
      itineraryId,
    }),
  })
  const data = await fetchSSO.json()
  if (fetchSSO.status !== 200) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new ValidationError(data.message)
  }

  const user = await prisma.user.create({
    data: {
      id: data.id,
      dni: dni.toUpperCase(),
      name,
      email,
      specializationId: existingCategory.id,
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
