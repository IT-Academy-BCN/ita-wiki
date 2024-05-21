import { Context, Middleware } from 'koa'
import { DeletedError, NotFoundError } from '../../../utils/errors'
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
  const notFoundIds = ids.filter((id: any) => !existingIds.includes(id))
  if (notFoundIds.length > 0) {
    throw new NotFoundError(`${notFoundIds} not found`)
  }

  const alreadyDeletedUser: string[] = []
  const deletedAtList = verifyResult.rows.map((row) => row.deleted_at)
  deletedAtList.map((deletedAt, index) => {
    if (deletedAt !== null) {
      alreadyDeletedUser.push(existingIds[index])
    }
    return alreadyDeletedUser
  })
  if (alreadyDeletedUser.length > 0) {
    throw new DeletedError(`${alreadyDeletedUser} already deleted`)
  }

  const query = `
  UPDATE "user"
  SET deleted_at = CURRENT_TIMESTAMP
  WHERE id = ANY($1::text[])
  `
  await client.query(query, [ids])
  ctx.status = 204
}
