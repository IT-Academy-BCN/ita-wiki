import Koa, { Middleware } from 'koa'
import { User } from '@prisma/client'
import { z } from 'zod'
import { favoritePutSchema } from '../../schemas/favorites/favoritePutSchema'
import { prisma } from '../../prisma/client'

type FavoriteByUserId = z.infer<typeof favoritePutSchema>

export const putFavoriteByUserId: Middleware = async (ctx: Koa.Context) => {
  const data = ctx.request.body as FavoriteByUserId
  const user = ctx.user as User

  const resource = await prisma.favorites.findFirst({
    where: { resourceId: data.id, userId: user.id },
  })

  if (!resource) {
    await prisma.favorites.create({
      data: {
        resourceId: data.id,
        userId: user.id,
      },
    })
  } else {
    await prisma.favorites.deleteMany({
      where: {
        resourceId: data.id,
        userId: user.id,
      },
    })
  }

  ctx.status = 204
}
