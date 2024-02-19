import { Context, Next } from 'koa'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { InvalidCredentials } from '../utils/errors'
import { appConfig } from '../config'
import { client } from '../models/db'
import { ValidateSchema } from '../schemas'

export const authenticate = async (ctx: Context, next: Next) => {
  const { authToken } = ctx.request.body as ValidateSchema
  if (!authToken) {
    throw new InvalidCredentials()
  }
  const { id } = jwt.verify(authToken, appConfig.jwtKey) as JwtPayload
  const userResult = await client.query(
    'SELECT id, role FROM "user" WHERE id = $1',
    [id]
  )
  const user = userResult.rows[0]
  if (!user) {
    throw new InvalidCredentials()
  }
  ctx.state.user = user
  await next()
}

export const authenticateCookie = async (ctx: Context, next: Next) => {
  const authToken = ctx.cookies.get('authToken')
  if (!authToken) {
    throw new InvalidCredentials()
  }
  const { id } = jwt.verify(authToken, appConfig.jwtKey) as JwtPayload
  const userResult = await client.query(
    'SELECT id, role FROM "user" WHERE id = $1',
    [id]
  )
  const user = userResult.rows[0]
  if (!user) {
    throw new InvalidCredentials()
  }
  ctx.state.user = user
  await next()
}
