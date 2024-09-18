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

  const { query, queryParams } = queryBuilder(ctx.state.query, mentorUserId)

  const queryResult = await db('user')
    .whereRaw(query, queryParams)
    .andWhere('deleted_at', null)

  if (!queryResult.length) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const usersName = queryResult
  ctx.status = 200
  ctx.body = usersName
}
