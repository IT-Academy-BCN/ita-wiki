import { Context, Middleware } from 'koa'
import { client } from '../../../db/client'
import { NotFoundError } from '../../../utils/errors'
import { DashboardUsersUpdateStatus } from '../../../schemas/users/dashboardUsersUpdateStatusSchema'

export const dashboardUpdateStatusUsers: Middleware = async (ctx: Context) => {
  const { ids, status } = ctx.request.body as DashboardUsersUpdateStatus

  const verifyQuery = `
      SELECT id FROM "user" WHERE id = ANY($1::text[]);
    `
  const verifyResult = await client.query(verifyQuery, [ids])
  const existingIds = verifyResult.rows.map((row) => row.id)

  const notFoundIds = ids.filter((id) => !existingIds.includes(id))

  if (notFoundIds.length > 0) {
    throw new NotFoundError(`${notFoundIds} not found`)
  }
  const query = `
    UPDATE "user"
    SET status = $1
    WHERE id = ANY($2::text[])
    `

  await client.query(query, [status, ids])

  ctx.status = 204
}
