import { z } from '../../openapi/zod'
import { dniQueryStringSchema } from '../dniQueryStringSchema'
import { itinerarySlugSchema } from '../itineraries/itinerarySchema'
import { UserStatus, userNameSchema, userStatusSchema } from './userSchema'

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
  startDate: startDateSchema.optional().openapi({
    param: {
      description: 'Start date to filter users by, format YYYY-MM-DD',
      example: '2023-03-05',
    },
    format: 'date',
  }),
  endDate: endDateSchema.optional().openapi({
    param: {
      description: 'End date to filter users by, format YYYY-MM-DD',
      example: '2026-03-05',
    },
    format: 'date',
  }),
  name: userNameSchema
    .min(2)
    .optional()
    .openapi({
      param: { description: 'Partial or full name to filter the users by' },
    }),
  dni: dniQueryStringSchema.optional().openapi({
    param: { description: 'Partial or full dni to filter the users by' },
  }),
})
