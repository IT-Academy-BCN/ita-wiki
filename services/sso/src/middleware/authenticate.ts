import { Context, Next } from 'koa'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ForbiddenError, InvalidCredentials } from '../utils/errors'
import { appConfig } from '../config'
import { client } from '../models/db'
import { ValidateSchema } from '../schemas'
import { UserStatus } from '../schemas/users/userSchema'

export const authenticate = async (ctx: Context, next: Next) => {
  const { authToken } = ctx.request.body as ValidateSchema
  if (!authToken) {
    throw new InvalidCredentials()
  }
  const { id } = jwt.verify(authToken, appConfig.jwtKey) as JwtPayload
  const userResult = await client.query(
    'SELECT id, role, status FROM "user" WHERE id = $1',
    [id]
  )
  const user = userResult.rows[0]
  if (!user) {
    throw new InvalidCredentials()
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new ForbiddenError('The user is Blocked')
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
    'SELECT id, role, status FROM "user" WHERE id = $1',
    [id]
  )
  const user = userResult.rows[0]
  if (!user) {
    throw new InvalidCredentials()
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new ForbiddenError('The user is Blocked')
  }
  ctx.state.user = user
  await next()
}
