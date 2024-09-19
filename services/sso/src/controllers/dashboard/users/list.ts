import { Context, Middleware } from 'koa'
import { queryBuilder } from '../../../utils/queryBuilder'
import { User, UserRole } from '../../../schemas'
import db from '../../../db/knexClient'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const { role, id } = ctx.state.user as Pick<User, 'id' | 'role'>
  let mentorUserId: string | undefined
  if (role === UserRole.MENTOR) {
    mentorUserId = id
  }

  const { query, queryParams } = queryBuilder(ctx, mentorUserId)

  const queryResult = await db.raw(query, queryParams)

  if (!queryResult.length) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const usersList = queryResult
  ctx.status = 200
  ctx.body = usersList
}
