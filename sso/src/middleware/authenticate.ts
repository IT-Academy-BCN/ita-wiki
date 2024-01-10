import { Context, Next } from 'koa'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ValidateSchema } from '../schemas/token/validateSchema'
import { InvalidCredentials } from '../utils/errors'
import { appConfig } from '../config'
import { client } from '../models/db'

export const authenticate = async (ctx: Context, next: Next) => {
  const { authToken } = ctx.request.body as ValidateSchema
  if (!authToken) {
    throw new InvalidCredentials()
  }
  const { id } = jwt.verify(authToken, appConfig.jwtKey) as JwtPayload
  const userResult = await client.query('SELECT id FROM "user" WHERE id = $1', [
    id,
  ])
  const user = userResult.rows[0]
  if (!user) {
    throw new InvalidCredentials()
  }
  ctx.id = id
  await next()
}
