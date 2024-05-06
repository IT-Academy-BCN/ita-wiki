import { Context, Middleware } from 'koa'
import { client } from '../../../models/db'
import { queryBuilder } from '../../../utils/queryBuilder'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const { query, queryParams } = queryBuilder(ctx.state.query)

  const queryResult = await client.query(query, queryParams)

  if (!queryResult.rowCount) {
    ctx.status = 200
    ctx.body = []
    return
  }
  const usersName = queryResult.rows
  ctx.status = 200
  ctx.body = usersName
}
