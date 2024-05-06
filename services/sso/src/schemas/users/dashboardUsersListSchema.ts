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
    deletedAt: true,
  })
  .extend({
    createdAt: z.date().openapi({ example: '21/02/2024' }),
    itineraryName: itineraryNameSchema,
  })
  .array()

export type DashboardUsersList = z.infer<typeof dashboardUsersListSchema>
