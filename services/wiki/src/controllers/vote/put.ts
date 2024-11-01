import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
// import { prisma } from '../../prisma/client'

import { NotFoundError } from '../../helpers/errors'
import db from '../../db/knex'

export const putVote: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const { resourceId, vote } = ctx.request.body

  let voteInt: number
  if (vote === 'up') {
    voteInt = 1
  } else if (vote === 'down') {
    voteInt = -1
  } else {
    voteInt = 0
  }

  const resource = await db('resource')
    .select()
    .where({
      id: resourceId,
    })
    .first()

  if (!resource) throw new NotFoundError('Resource not found')

  await db('vote')
    .insert({
      user_id: user.id,
      resource_id: resourceId,
      vote: voteInt,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .onConflict(['user_id', 'resource_id'])
    .merge(['vote'])

  ctx.status = 204
}
