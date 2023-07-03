import { Context } from 'koa'

export const logoutController = async (ctx: Context) => {
  ctx.cookies.set('token', null)
  ctx.status = 204
}
