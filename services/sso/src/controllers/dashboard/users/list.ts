import { Context, Middleware } from 'koa'
import { TUser, UserRole } from '../../../schemas'
import db from '../../../db/knexClient'
import { knexQueryBuilder } from '../../../utils/knex.queryBuilder'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const { role, id } = ctx.state.user as Pick<TUser, 'id' | 'role'>
  let mentorUserId: string | undefined
  if (role === UserRole.MENTOR) {
    mentorUserId = id
  }

  const { query } = knexQueryBuilder(ctx, db, mentorUserId)

  const queryResult = await query

  if (!queryResult.length) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const usersList = queryResult
  ctx.status = 200
  ctx.body = usersList
}
