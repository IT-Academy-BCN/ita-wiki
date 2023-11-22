import { Context, Middleware } from 'koa'
import { InvalidCredentials } from '../../utils/errors'
import { verifyToken } from '../../utils/auth'
import { ValidateSchema } from '../../schemas/token/validateSchema'

export const validate: Middleware = async (ctx: Context) => {
  const { authToken } = ctx.request.body as ValidateSchema

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
