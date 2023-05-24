import Koa, { Middleware } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from '../../prisma/client'
import {
  NotFoundError,
  DefaultError,
  UnauthorizedError,
} from '../../helpers/errors'

export const getFavoriteResources: Middleware = async (ctx: Koa.Context) => {
  const token = ctx.cookies.get('token') as string
  if (!token) throw new UnauthorizedError()

  const { userId } = jwt.verify(token, process.env.JWT_KEY as Secret) as {
    userId: string
  }
  if (!userId) throw new DefaultError(400, 'User is needed')

  const { categorySlug } = ctx.params

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError('User not found')
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
