import { Context, Middleware } from 'koa'
import { User } from '../../../schemas'
import { NotFoundError } from '../../../utils/errors'
import db from '../../../db/knexClient'

export const getMe: Middleware = async (ctx: Context) => {
  const { id } = ctx.state.user as Pick<User, 'id' | 'role'>

  const queryResult = await db
    .select('dni', 'email', 'name', 'role')
    .from('user')
    .where({ id })

  const user = queryResult[0]
  if (!user) {
    throw new NotFoundError('User Not found')
  }

  ctx.status = 200
  ctx.body = user
}
