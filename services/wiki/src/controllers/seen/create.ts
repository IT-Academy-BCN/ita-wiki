import Koa, { Middleware } from 'koa'
import { MissingParamError, NotFoundError } from '../../helpers/errors'
import db from '../../db/knex'

type User = {
  id: string
  created_at: Date
  updated_at: Date
}

export const createSeenResource: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const { resourceId } = ctx.params
  if (!resourceId) throw new MissingParamError('resource_id')

  const resourceFound = await db('resource').where({ id: resourceId }).first()

  if (resourceFound === undefined) throw new NotFoundError('Resource not found')

  await db('viewed_resource')
    .insert({
      user_id: user.id,
      resource_id: resourceFound.id,
    })
    .onConflict(['user_id', 'resource_id'])
    .merge()

  ctx.status = 204
}
