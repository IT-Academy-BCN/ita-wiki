import { z } from '../../openapi/zod'
import { itinerarySlugSchema } from '../itineraries/itinerarySchema'
import { UserStatus, userStatusSchema } from './userSchema'

export const startDateSchema = z.coerce.date()
export const endDateSchema = z.coerce.date()
export const dashboardUsersListQuerySchema = z.object({
  itinerarySlug: itinerarySlugSchema.optional().openapi({
    param: {
      description:
        'Slug of the itinerary for which to retrieve users by itineraries',
      example: 'frontend-angular',
    },
    example: 'frontend-angular',
  }),
  status: userStatusSchema.optional().openapi({
    param: {
      description: 'Status to filter by',
      example: UserStatus.ACTIVE,
    },
  }),
  startDate: startDateSchema.optional().openapi({ format: 'date' }),
  endDate: endDateSchema.optional().openapi({ format: 'date' }),
})
