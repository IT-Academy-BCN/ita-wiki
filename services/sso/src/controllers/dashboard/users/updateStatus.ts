import { Context, Middleware } from 'koa'
import db from '../../../db/knexClient'
import { NotFoundError } from '../../../utils/errors'
import { TDashboardUsersUpdateStatus } from '../../../schemas/users/dashboardUsersUpdateStatusSchema'

export const dashboardUpdateStatusUsers: Middleware = async (ctx: Context) => {
  const { ids, status } = ctx.request.body as TDashboardUsersUpdateStatus

  const verifyResult = await db('user').select('id').whereIn('id', ids)

  const existingIds = verifyResult.map((row) => row.id)

  const notFoundIds = ids.filter((id) => !existingIds.includes(id))

  if (notFoundIds.length > 0) {
    throw new NotFoundError(`${notFoundIds} not found`)
  }

  await db('user').update({ status }).whereIn('id', ids)

  ctx.status = 204
}
