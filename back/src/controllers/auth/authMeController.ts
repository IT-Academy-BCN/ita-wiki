import { Middleware, Context } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from '../../prisma/client'

export const authMeController: Middleware = async (ctx: Context) => {
  const { id } = ctx.user

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      dni: true,
      email: true,
      role: true,
      status: true,
      role: true,
    },
  })

  if (!user) {
    ctx.status = 404
    ctx.body = { error: 'User not found' }
    return
  }
  ctx.status = 200
  ctx.body = user
}
