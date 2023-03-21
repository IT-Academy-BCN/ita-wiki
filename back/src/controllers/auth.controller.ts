import { Middleware, Context } from 'koa'

export const login: Middleware = (ctx: Context) => {
  ctx.status = 200
  ctx.body = {
    message: 'login url',
  }
}
