import { Context, Middleware } from 'koa'
import { User } from '../../../schemas'
import { client } from '../../../db/client'
import { NotFoundError } from '../../../utils/errors'

export const getMe: Middleware = async (ctx: Context) => {
  const { id } = ctx.state.user as Pick<User, 'id' | 'role'>
  const queryResult = await client.query(
    'SELECT dni, email, name, role FROM "user" WHERE id = $1',
    [id]
  )

  const user = queryResult.rows[0]
  if (!user) {
    throw new NotFoundError('User Not found')
  }
  ctx.status = 200
  ctx.body = user
}
