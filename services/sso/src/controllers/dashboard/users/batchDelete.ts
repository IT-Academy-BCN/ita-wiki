import { Context, Middleware } from 'koa'
import { NotFoundError } from '../../../utils/errors'
import db from '../../../db/knexClient'

export const dashboardBatchDelete: Middleware = async (ctx: Context) => {
  const { ids } = ctx.request.body
  if (ids.length === 0) {
    throw new NotFoundError('No user found')
  }

  const verifyResult = await db('user')
    .select('id', 'deleted_at')
    .whereIn('id', ids)

  const existingIds = verifyResult.map((row) => row.id)

  if (existingIds.length === 0) {
    throw new NotFoundError('No user found')
  }

  const toBeDeletedUser: string[] = verifyResult
    .filter((row) => row.deleted_at === null)
    .map((row) => row.id)

  if (toBeDeletedUser.length > 0) {
    await db('user')
      .whereIn('id', toBeDeletedUser)
      .update({ deleted_at: db.fn.now() })
  }

  ctx.status = 204
}
