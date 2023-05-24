import Koa, { Middleware } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from '../../prisma/client'

export const getFavoriteResources: Middleware = async (ctx: Koa.Context) => {
  const token = ctx.cookies.get('token') as string
  const { userId } = jwt.verify(token, process.env.JWT_KEY as Secret) as {
    userId: string
  }

  const { categorySlug } = ctx.params

  const favorites = await prisma.favorites.findMany({
    where: {
      userId,
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
