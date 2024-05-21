import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import { InvalidCredentials } from '../utils/errors'
import { appConfig } from '../config'
import { generateToken } from '../utils/jwtAuth'
import { validateUserAndToken } from '../utils/authHelper'

export const authenticate = async (ctx: Context, next: Next) => {
  const authHeader = ctx.request.headers.authorization
  const authTokenFromCookie = ctx.cookies.get('authToken')
  const authTokenFromBody: string | undefined = ctx.request.body?.authToken
  let authToken
  if (authHeader?.startsWith('Bearer ')) {
    authToken = authHeader.slice(7)
  } else {
    authToken = authTokenFromBody ?? authTokenFromCookie
  }
  const refreshToken = ctx.cookies.get('refreshToken')

  try {
    const user = await validateUserAndToken('auth', authToken)
    ctx.state.user = user
    await next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      if (authTokenFromBody || authHeader)
        throw new InvalidCredentials('Token has expired')
      const user = await validateUserAndToken('refresh', refreshToken)
      const newToken = generateToken(user.id, 'auth')
      ctx.cookies.set('authToken', newToken, {
        httpOnly: true,
        maxAge: appConfig.authCookieExpiration,
      })

      ctx.state.user = user
      await next()
    } else {
      throw error
    }
  }
}
