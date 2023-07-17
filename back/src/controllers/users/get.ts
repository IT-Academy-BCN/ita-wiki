import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'

export const getUsers: Middleware = async (ctx: Context) => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      dni: true,
      email: true,
      status: true,
      role: true,
    },
  })

  ctx.status = 200
  ctx.body = users
}
