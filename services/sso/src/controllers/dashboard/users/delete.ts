import { Middleware } from 'koa'
import { Context } from 'vm'
import { userIdSchema } from '../../../schemas/users/userSchema'
import { DeletedError, NotFoundError } from '../../../utils/errors'
import db from '../../../db/knexClient'

export const dashboardDeleteUser: Middleware = async (ctx: Context) => {
  const id = userIdSchema.parse(ctx.params.id)
  const user = await db('user').select('deleted_at').where({ id }).first()
  if (user === undefined) {
    throw new NotFoundError('User not found')
  } else if (user.deleted_at !== null) {
    throw new DeletedError('User already deleted')
  }

  const updateQuery: { deleted_at: string }[] = await db('user')
    .update({ deleted_at: new Date() }, ['deleted_at'])
    .where({ id })

  if (updateQuery.length === 0) {
    throw new NotFoundError('User not found')
  }
  ctx.status = 204
}
