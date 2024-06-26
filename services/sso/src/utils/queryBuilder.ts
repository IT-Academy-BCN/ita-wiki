import { Context } from 'vm'
import { dniQueryStringSchema } from '../schemas/dniQueryStringSchema'
import { itinerarySlugSchema } from '../schemas/itineraries/itinerarySchema'
import {
  endDateSchema,
  extendedUserStatus,
  extendedUserStatusSchema,
  startDateSchema,
} from '../schemas/users/dashboardUsersListQuerySchema'
import { userNameSchema, userRoleSchema } from '../schemas/users/userSchema'

export const queryBuilder = (ctx: Context, mentorUserId?: string) => {
  const { itinerarySlug, status, startDate, endDate, name, dni, role } = ctx
  let query = `
  SELECT
    u.id,
    u.name AS name,
    u.dni AS dni,
    u.status,
    u.role,
    u.deleted_at AS "deletedAt",
    TO_CHAR(u.created_at, 'YYYY-MM-DD') AS "createdAt",
    i.name AS "itineraryName"
  FROM
    "user" u
    JOIN itinerary i ON u.itinerary_id = i.id
    `
  const queryParams = []
  const conditions = []
  const orConditions = []

  if (mentorUserId) {
    queryParams.push(mentorUserId)
    conditions.push(
      `u.itinerary_id = (SELECT itinerary_id FROM "user" WHERE id = $${queryParams.length})`
    )
  }

  if (name) {
    const parsedName = userNameSchema.parse(name)
    orConditions.push(`u.name ILIKE $${queryParams.length + 1}`)
    queryParams.push(`%${parsedName}%`)
  }
  if (dni) {
    const parsedDni = dniQueryStringSchema.parse(dni)
    orConditions.push(`u.dni ILIKE $${queryParams.length + 1}`)
    queryParams.push(`%${parsedDni}%`)
  }
  if (orConditions.length > 0) {
    conditions.push(`(${orConditions.join(' OR ')})`)
  }
  if (status) {
    const parsedStatus = extendedUserStatusSchema.parse(status)
    if (status === extendedUserStatus.DELETED) {
      conditions.push(`u.deleted_at IS NOT NULL`)
    } else {
      conditions.push(`u.status = $${queryParams.length + 1}`)
      queryParams.push(parsedStatus)
      conditions.push(`u.deleted_at IS NULL`)
    }
  }
  if (role) {
    const parsedRole = userRoleSchema.parse(role)
    conditions.push(`u.role = $${queryParams.length + 1}`)
    queryParams.push(parsedRole)
  }
  if (startDate) {
    const parsedStartDate = startDateSchema.parse(startDate)
    conditions.push(`u.created_at >= $${queryParams.length + 1}`)
    queryParams.push(parsedStartDate)
  }
  if (endDate) {
    const parsedEndDate = endDateSchema.parse(endDate)
    conditions.push(`u.created_at <= $${queryParams.length + 1}`)
    queryParams.push(parsedEndDate)
  }
  if (itinerarySlug) {
    const parsedSlug = itinerarySlugSchema.parse(itinerarySlug)
    conditions.push(`i.slug = $${queryParams.length + 1}`)
    queryParams.push(parsedSlug)
  }
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`
  }
  return { query, queryParams }
}
