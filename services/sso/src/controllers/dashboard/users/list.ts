import { Context, Middleware } from 'koa'
import { client } from '../../../models/db'
import { itinerarySlugSchema } from '../../../schemas/itineraries/itinerarySchema'
import {
  userNameSchema,
  userStatusSchema,
} from '../../../schemas/users/userSchema'
import {
  endDateSchema,
  startDateSchema,
} from '../../../schemas/users/dashboardUsersListQuerySchema'
import { dniQueryStringSchema } from '../../../schemas/dniQueryStringSchema'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const { itinerarySlug, status, startDate, endDate, name, dni } =
    ctx.state.query
  let query = `
  SELECT
    u.id,
    u.name AS name,
    u.dni AS dni,
    u.status,
    TO_CHAR(u.created_at, 'YYYY-MM-DD') AS "createdAt",
    i.name AS "itineraryName"
  FROM
    "user" u
  JOIN itinerary i ON u.itinerary_id = i.id
`
  const queryParams = []
  const conditions = []
  if (name) {
    const parsedName = userNameSchema.parse(name)
    conditions.push(`u.name ILIKE $${conditions.length + 1}`)
    queryParams.push(`%${parsedName}%`)
  }
  if (dni) {
    const parsedDni = dniQueryStringSchema.parse(dni)
    conditions.push(`u.dni ILIKE $${conditions.length + 1}`)
    queryParams.push(`%${parsedDni}%`)
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
  if (itinerarySlug) {
    const parsedSlug = itinerarySlugSchema.parse(itinerarySlug)
    conditions.push(`i.slug = $${conditions.length + 1}`)
    queryParams.push(parsedSlug)
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
