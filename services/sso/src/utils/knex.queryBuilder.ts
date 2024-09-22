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
import { Knex } from 'knex'

export const knexQueryBuilder = (ctx: Context, knexClient: Knex, mentorUserId?: string) => {
    const { itinerarySlug, status, startDate, endDate, name, dni, role } = ctx

    const query = knexClient('user as u')
        .join('itinerary as i', 'u.itinerary_id', "=", 'i.id')
        .select(
            'u.id',
            'u.name as name',
            'u.dni as dni',
            'u.status',
            'u.role',
            'u.deleted_at as deletedAt',
            'u.created_at as createdAt', // change date
            'i.name as itineraryName'
        )

//TODO Check this =>
        if (name) {
            const parsedName = userNameSchema.parse(name)
            query.where('u.name', 'ILIKE', `%${parsedName}%`)
          }
          
          if (mentorUserId) {
            query.where('u.itinerary_id', knexClient.raw('(SELECT itinerary_id FROM "user" WHERE id = ?)', [mentorUserId]))
          }
          
          if (name) {
            const parsedName = userNameSchema.parse(name)
            query.where('u.name', 'ILIKE', `%${parsedName}%`)
          }
          
          if (dni) {
            const parsedDni = dniQueryStringSchema.parse(dni)
            query.where('u.dni', 'ILIKE', `%${parsedDni}%`)
          }
          
          if (status) {
            const parsedStatus = extendedUserStatusSchema.parse(status)
            if (status === extendedUserStatus.DELETED) {
              query.whereNotNull('u.deleted_at')
            } else {
              query.where('u.status', parsedStatus).whereNull('u.deleted_at')
            }
          }
          
          if (role) {
            const parsedRole = userRoleSchema.parse(role)
            query.where('u.role', parsedRole)
          }
          
          if (startDate) {
            const parsedStartDate = startDateSchema.parse(startDate)
            query.where('u.created_at', '>=', parsedStartDate)
          }
          
          if (endDate) {
            const parsedEndDate = endDateSchema.parse(endDate)
            query.where('u.created_at', '<=', parsedEndDate)
          }
          
          if (itinerarySlug) {
            const parsedSlug = itinerarySlugSchema.parse(itinerarySlug)
            query.where('i.slug', parsedSlug)
          }

          return { query }
}