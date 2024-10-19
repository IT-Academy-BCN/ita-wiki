import { itineraryNameSchema } from '../itineraries/itinerarySchema'
import { userSchema } from './userSchema'
import { z } from '../../openapi/zod'

export const dashboardUsersListSchema = userSchema
  .pick({
    id: true,
    dni: true,
    name: true,
    status: true,
    role: true,
  })
  .extend({
    createdAt: z.date().openapi({ example: '21/02/2024' }),
    itineraryName: itineraryNameSchema,
    deletedAt: z.date().nullable().openapi({ example: null }),
  })
  .array()

export type TDashboardUsersList = z.infer<typeof dashboardUsersListSchema>
