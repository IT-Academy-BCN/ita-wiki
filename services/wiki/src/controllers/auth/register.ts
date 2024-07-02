import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { UserRegister } from '../../schemas/users/userRegisterSchema'
import { ssoHandler } from '../../helpers'

export const registerController: Middleware = async (ctx: Context) => {
  const {
    dni,
    password,
    name,
    email,
    confirmPassword,
    itineraryId,
  }: UserRegister = ctx.request.body

  const { id } = await ssoHandler.register({
    dni,
    password,
    name,
    confirmPassword,
    email,
    itineraryId,
  })

  await prisma.user.create({
    data: {
      id,
    },
  })

  ctx.status = 204
}
