import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'

export const getUserFavoriteResources: Middleware = async (
  ctx: Koa.Context
) => {
  const { userId } = ctx.params
  if (!userId) {
    ctx.status = 400
    ctx.body = { error: 'User ID is required' }
    return
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    ctx.status = 404
    ctx.body = { error: 'User not found' }
    return
  }

  const favorites = await prisma.favorites.findMany({
    where: {
      userId,
    },
    select: {
      resource: true,
    },
  })
  ctx.status = 200
  ctx.body = favorites
}
