import { Context, Middleware } from 'koa'

export const logoutController: Middleware = async (ctx: Context) => {
  ctx.status = 204
}
