import { Context, Middleware } from 'koa'
import { client } from '../../db/client'

export const listItineraries: Middleware = async (ctx: Context) => {
  const { rows: data } = await client.query('SELECT * FROM "itinerary";')

  ctx.status = 200
  ctx.body = data
}
