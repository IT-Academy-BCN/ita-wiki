import { Context, Middleware } from 'koa'
import { generateToken } from '../../utils/jwtAuth'
import { TUser } from '../../schemas'

export const refresh: Middleware = async (ctx: Context) => {
  const { id } = ctx.state.user as Pick<TUser, 'id' | 'role'>
  const authToken = generateToken(id, 'auth')
  ctx.status = 200
  ctx.body = { authToken }
}
