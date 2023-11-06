import { Context, Middleware } from 'koa'

export const loginController: Middleware = async (ctx: Context) => {
  ctx.status = 204
}
