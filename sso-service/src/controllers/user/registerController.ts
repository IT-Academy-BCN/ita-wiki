import { Context, Middleware } from 'koa'

export const registerController: Middleware = async (ctx: Context) => {
  ctx.status = 204
}
