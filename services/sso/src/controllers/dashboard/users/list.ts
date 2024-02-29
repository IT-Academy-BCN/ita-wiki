import { Context, Middleware } from 'koa'
import { client } from '../../../models/db'
import { itinerarySlugSchema } from '../../../schemas/itineraries/itinerarySchema'
import { userStatusSchema } from '../../../schemas/users/userSchema'
import {
  endDateSchema,
  startDateSchema,
} from '../../../schemas/users/dashboardUsersListQuerySchema'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const { itinerarySlug, status, startDate, endDate } = ctx.state.query
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
  const conditions = []
  if (itinerarySlug) {
    const parsedSlug = itinerarySlugSchema.parse(itinerarySlug)
    conditions.push(`i.slug = $${conditions.length + 1}`)
    queryParams.push(parsedSlug)
  }
  if (status) {
    const parsedStatus = userStatusSchema.parse(status)
    conditions.push(`u.status = $${conditions.length + 1}`)
    queryParams.push(parsedStatus)
  }
  if (startDate) {
    const parsedStartDate = startDateSchema.parse(startDate)
    conditions.push(`u.created_at >= $${conditions.length + 1}`)
    queryParams.push(parsedStartDate)
  }
  if (endDate) {
    const parsedEndDate = endDateSchema.parse(endDate)
    conditions.push(`u.created_at <= $${conditions.length + 1}`)
    queryParams.push(parsedEndDate)
  }
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`
  }
  const queryResult = await client.query(query, queryParams)

  if (!queryResult.rowCount) {
    ctx.status = 200
    ctx.body = []
    return
  }
  const usersName = queryResult.rows
  ctx.status = 200
  ctx.body = usersName
}
