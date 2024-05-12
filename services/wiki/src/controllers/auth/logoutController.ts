import { Context } from 'koa'

export const logoutController = async (ctx: Context) => {
  ctx.cookies.set('token', null)
  ctx.cookies.set('authToken', null, {
    httpOnly: true,
    maxAge: 0,
  })
  ctx.cookies.set('refreshToken', null, {
    httpOnly: true,
    maxAge: 0,
  })
  ctx.status = 204
}
