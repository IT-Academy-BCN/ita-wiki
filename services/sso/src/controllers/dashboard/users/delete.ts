import { Middleware } from 'koa'
import { Context } from 'vm'
import { userIdSchema } from '../../../schemas/users/userSchema'
import { client } from '../../../models/db'
import { NotFoundError } from '../../../utils/errors'

export const dashboardDeleteUser: Middleware = async (ctx: Context) => {
  const id = userIdSchema.parse(ctx.params.id)
  const userResult = await client.query('SELECT id FROM "user" WHERE id = $1', [
    id,
  ])
  if (!userResult.rows.length) {
    throw new NotFoundError('User not found')
  }
  const deleteDate = new Date()
  const updateQuery = `UPDATE "user" SET deleted_at = ${deleteDate} WHERE id = ${id}`
  await client.query(updateQuery)
  ctx.message = `User deleted at ${deleteDate}`
  ctx.status = 410
}
