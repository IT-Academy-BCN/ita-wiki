import { Context, Middleware } from 'koa'
import { client } from '../../../db/client'
import { queryBuilder } from '../../../utils/queryBuilder'
import { User, UserRole } from '../../../schemas'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const { role, id } = ctx.state.user as Pick<User, 'id' | 'role'>
  let mentorUserId: string | undefined
  if (role === UserRole.MENTOR) {
    mentorUserId = id
  }
  const { query, queryParams } = queryBuilder(ctx.state.query, mentorUserId)

  const queryResult = await client.query(query, queryParams)

  if (!queryResult.rowCount) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const usersName = queryResult
  ctx.status = 200
  ctx.body = usersName
}
