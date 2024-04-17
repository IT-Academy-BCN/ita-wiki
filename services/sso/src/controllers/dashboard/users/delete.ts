import { Middleware } from 'koa'
import { Context } from 'vm'
import { userIdSchema } from '../../../schemas/users/userSchema'
import { client } from '../../../models/db'
import { DeletedError, NotFoundError } from '../../../utils/errors'

export const dashboardDeleteUser: Middleware = async (ctx: Context) => {
  const id = userIdSchema.parse(ctx.params.id)
  const userResult = await client.query(
    'SELECT id, deleted_at FROM "user" WHERE id = $1',
    [id]
  )
  if (!userResult.rows.length) {
    throw new NotFoundError('User not found')
  }
  if (userResult.rows[0].deleted_at !== null) {
    throw new DeletedError('User already deleted')
  }
  const updateQuery =
    'UPDATE "user" SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1'
  await client.query(updateQuery, [id])
  ctx.status = 204
}
