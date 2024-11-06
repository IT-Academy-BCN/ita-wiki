import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { NotFoundError } from '../../helpers/errors'
import { calculateVoteCount } from '../../helpers/transformResourceToAPI'
import db from '../../db/knex'

export const getVote: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const { resourceId } = ctx.params

  const resource = await db('resource')
    .where({
      id: resourceId,
    })
    .select('id')
    .first()

  if (!resource) throw new NotFoundError('Resource not found')

  const votes = await db('vote').where({
    resource_id: resourceId,
  })

  const voteCount = calculateVoteCount(votes, user ? user.id : undefined)

  ctx.status = 200
  ctx.body = voteCount
}
