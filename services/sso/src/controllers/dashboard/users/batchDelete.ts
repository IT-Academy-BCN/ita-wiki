import { Context, Middleware } from 'koa'
import { NotFoundError } from '../../../utils/errors'
import { userManager } from '../../../db/managers/userManager'
import db from '../../../db/knexClient'

export const dashboardBatchDelete: Middleware = async (ctx: Context) => {
  const { ids } = ctx.request.body

  if (ids.length === 0) {
    throw new NotFoundError('No user found')
  }

  const users = await userManager.getUsersByIds(
    { fields: ['id', 'deletedAt'] },
    false,
    ids
  )

  if (users.length === 0) {
    throw new NotFoundError('No user found')
  }

  const toBeDeletedUser = users
    .filter((user) => user.deletedAt === null)
    .map((user) => user.id)

  if (toBeDeletedUser.length > 0) {
    await db('user')
      .whereIn('id', toBeDeletedUser)
      .update({ deleted_at: db.fn.now() })
  }

  ctx.status = 204
}
