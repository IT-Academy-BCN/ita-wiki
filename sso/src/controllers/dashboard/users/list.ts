import { Context, Middleware } from 'koa'
import { client } from '../../../models/db'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const queryResult = await client.query(
    `SELECT
    u.id,
    u.name AS name,
    i.name AS "itineraryName",
    u.status,
    TO_CHAR(u.created_at, 'YYYY-MM-DD') AS "createdAt"
  FROM
    "user" u
  JOIN itinerary i ON u.itinerary_id = i.id;`
  )

  if (!queryResult.rowCount) {
    ctx.status = 200
    ctx.body = []
    return
  }
  const usersName = queryResult.rows
  ctx.status = 200
  ctx.body = usersName
}
