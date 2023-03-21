import Koa from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { jwtLocalStorage } from '../helpers'
import { UnauthorizedError } from '../helpers/errors'

const verifyToken = (token: string) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY as Secret)
  return decodedToken
}

export const authMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  const token = ctx.cookies.get('token')
  if (!token) throw new UnauthorizedError()

  try {
    const decodedToken = verifyToken(token)
    ctx.jwt.token = decodedToken
    jwtLocalStorage.enterWith(ctx.jwt)
    await next()
  } catch (error) {
    throw new Error(`${error}`)
  }
}
