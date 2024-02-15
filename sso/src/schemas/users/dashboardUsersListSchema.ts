import { itineraryNameSchema } from '../itineraries/itinerarySchema'
import { userSchema } from './userSchema'
import { z } from '../../openapi/zod'

export const dashboardUsersListSchema = userSchema
  .pick({
    id: true,
    name: true,
    status: true,
  })
  .extend({
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    itineraryName: itineraryNameSchema,
  })
  .array()
