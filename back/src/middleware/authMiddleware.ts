import Koa from 'koa'
import jwt, { Secret } from 'jsonwebtoken'

export const authMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  const token = ctx.cookies.get('token')
  if (!token) {
    ctx.status = 401
    ctx.body = 'Unauthorized: Missing token'
    return
  }

  try {
    jwt.verify(token, process.env.JWT_KEY as Secret)
    await next()
  } catch (error) {
    ctx.status = 405
    ctx.body = 'Token is not valid'
  }
}
