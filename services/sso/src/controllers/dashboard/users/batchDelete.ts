import { Context, Middleware } from 'koa'
import { NotFoundError } from '../../../utils/errors'
import { client } from '../../../db/client'

export const dashboardBatchDelete: Middleware = async (ctx: Context) => {
  const { ids } = ctx.request.body
  if (ids.length === 0) {
    throw new NotFoundError('No user found')
  }
  const verifyQuery = `
  SELECT id, deleted_at FROM "user" WHERE id = ANY($1::text[]);
  `
  const verifyResult = await client.query(verifyQuery, [ids])
  const existingIds = verifyResult.rows.map((row) => row.id)
  if (existingIds.length === 0) {
    throw new NotFoundError('No user found')
  }

  const toBeDeletedUser: string[] = []
  verifyResult.rows.forEach((row) => {
    if (row.deleted_at === null) {
      toBeDeletedUser.push(row.id)
    }
  })

  if (toBeDeletedUser.length > 0) {
    const deleteQuery = `
      UPDATE "user"
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ANY($1::text[])
    `
    await client.query(deleteQuery, [toBeDeletedUser])
  }
  ctx.status = 204
}
