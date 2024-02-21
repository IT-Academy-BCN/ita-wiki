import { z } from '../../openapi/zod'
import { itinerarySlugSchema } from '../itineraries/itinerarySchema'

export const dashboardUsersListQuerySchema = z.object({
  itinerarySlug: itinerarySlugSchema.optional().openapi({
    param: {
      description: 'Slug of the itinerary for which to retrieve itineraries',
      example: 'frontend-angular',
    },
    example: 'frontend-angular',
  }),
})
