import { Context, Middleware } from 'koa'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { InvalidCredentials } from '../../utils/errors'
import { ValidateSchema } from '../../schemas/token/validateSchema'
import { appConfig } from '../../config'

export const validate: Middleware = async (ctx: Context) => {
  const { authToken } = ctx.request.body as ValidateSchema

  if (!authToken) {
    throw new InvalidCredentials()
  }

  const { id } = jwt.verify(authToken, appConfig.jwtKey) as JwtPayload

  if (!id) {
    throw new InvalidCredentials()
  } else {
    ctx.status = 200
    ctx.body = { id }
  }
}
