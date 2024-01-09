import { Context, Middleware } from 'koa'
import { client } from '../../models/db'
import { NotFoundError } from '../../utils/errors'

export const getUserController: Middleware = async (ctx: Context) => {
  const { id } = ctx
  const userResult = await client.query(
    'SELECT dni, email FROM "user" WHERE id = $1',
    [id]
  )

  const user = userResult.rows[0]
  if (!user) {
    throw new NotFoundError('User Not found')
  }
  ctx.status = 200
  ctx.body = { dni: user.dni, email: user.email }
}
