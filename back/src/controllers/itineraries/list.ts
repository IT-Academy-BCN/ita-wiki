import Koa, { Middleware } from 'koa'
import { ssoHandler } from '../../helpers'

export const listItineraries: Middleware = async (ctx: Koa.Context) => {
  const data = await ssoHandler.listItineraries()
  ctx.status = 200
  ctx.body = data
}
