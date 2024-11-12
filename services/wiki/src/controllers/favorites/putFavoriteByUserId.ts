import Koa, { Middleware } from 'koa'
import { z } from 'zod'
import { favoritePutSchema } from '../../schemas/favorites/favoritePutSchema'
import { NotFoundError } from '../../helpers/errors'
import db from '../../db/knex'

type User = {
  id: string
  createdAt: Date
  updatedAt: Date
}

type FavoriteByUserId = z.infer<typeof favoritePutSchema>

export const putFavoriteByUserId: Middleware = async (ctx: Koa.Context) => {
  const data = ctx.request.body as FavoriteByUserId
  const user = ctx.user as User

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const resource = await db('favorites')
    .where({ resource_id: data.id, user_id: user.id })
    .first()

  if (!resource) {
    await db('favorites').insert({
      resource_id: data.id,
      user_id: user.id,
    })
  } else {
    await db('favorites')
      .where({ resource_id: data.id, user_id: user.id })
      .del()
  }

  ctx.status = 204
}
