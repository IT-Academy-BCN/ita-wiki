import { Context, Middleware } from 'koa'
import { client } from '../../models/db'
import { NotFoundError } from '../../utils/errors'
import { User } from '../../schemas'

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
  ctx.body = {
    dni: user.dni,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
