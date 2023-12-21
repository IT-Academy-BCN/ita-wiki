import Koa, { Middleware } from 'koa'
import { handleSSO } from '../../helpers/handleSso'

export const getItineraries: Middleware = async (ctx: Koa.Context) => {
  const fetchSSO = await handleSSO('getItineraries')
  ctx.status = 200
  ctx.body = fetchSSO.data
}
