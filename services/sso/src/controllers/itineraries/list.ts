import { Context, Middleware } from 'koa'
import { userManager } from '../../db/managers/userManager'

export const listItineraries: Middleware = async (ctx: Context) => {
  const data = await userManager.getAllItineraries()

  ctx.status = 200
  ctx.body = data
}
