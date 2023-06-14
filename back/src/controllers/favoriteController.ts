import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'
import { NotFoundError, DefaultError } from '../helpers/errors'

export const getUserFavoriteResources: Middleware = async (
  ctx: Koa.Context
) => {
  const { userId, categorySlug } = ctx.params
  if (!userId) throw new DefaultError(400, 'User is needed')

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError('User not found')
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
  favorites = favorites.map((f) => f.resource)

  ctx.status = 200
  ctx.body = favorites
}
