import { Context, Middleware } from 'koa'
import { client } from '../../../models/db'
import { itinerarySlugSchema } from '../../../schemas/itineraries/itinerarySchema'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const { itinerarySlug } = ctx.state.query
  let query = `
  SELECT
    u.id,
    u.name AS name,
    i.name AS "itineraryName",
    u.status,
    TO_CHAR(u.created_at, 'YYYY-MM-DD') AS "createdAt"
  FROM
    "user" u
  JOIN itinerary i ON u.itinerary_id = i.id
`
  const queryParams = []
  if (itinerarySlug) {
    const parsedSlug = itinerarySlugSchema.parse(itinerarySlug)
    query += `WHERE i.slug = $1`
    queryParams.push(parsedSlug)
  }
  const queryResult = await client.query(
    query,
    queryParams.length > 0 ? queryParams : undefined
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
