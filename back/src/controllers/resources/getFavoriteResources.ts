import Koa, { Middleware } from 'koa'
import { User } from '@prisma/client'
import { prisma } from '../../prisma/client'

export const getFavoriteResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const { categorySlug } = ctx.params
  const favorites = await prisma.favorites.findMany({
    where: {
      userId: user.id,
      resource: {
        ...(categorySlug && {
          topics: {
            some: {
              topic: {
                category: { slug: categorySlug },
              },
            },
          },
        }),
      },
    },
    select: {
      resource: true,
    },
  })

  ctx.status = 200
  ctx.body = favorites
}
