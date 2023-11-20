import { Context, Middleware } from 'koa'
import { InvalidCredentials } from '../../utils/errors'
import { verifyToken } from '../../utils/auth'

export const checkToken: Middleware = async (ctx: Context) => {
  const { authToken } = ctx.request.body

  if (!authToken) {
    throw new InvalidCredentials()
  }

  const validToken = verifyToken(authToken)

  if (!validToken) {
    throw new InvalidCredentials()
  } else {
    ctx.status = 204
  }
}
