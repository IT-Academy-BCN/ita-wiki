import { Context } from 'koa'

export const dashboardLogoutController = async (ctx: Context) => {
  ctx.cookies.set('authToken', '', { expires: new Date(1), path: '/' })
  ctx.cookies.set('refreshToken', '', { expires: new Date(1), path: '/' })
  ctx.status = 204
}
