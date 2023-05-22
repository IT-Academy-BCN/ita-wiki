import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'

export const getUserFavoriteResources: Middleware = async (
  ctx: Koa.Context
) => {
  const { userId, categorySlug } = ctx.params
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
  let favorites
  if (categorySlug) {
    favorites = await prisma.favorites.findMany({
      where: {
        userId,
        resource: {
          topics: {
            some: {
              topic: {
                category: { slug: categorySlug },
              },
            },
          },
        },
      },
      select: {
        resource: true,
      },
    })
  } else {
    favorites = await prisma.favorites.findMany({
      where: {
        userId,
      },
      select: {
        resource: true,
      },
    })
  }
  ctx.status = 200
  ctx.body = favorites
}
