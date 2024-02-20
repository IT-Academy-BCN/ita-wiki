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
    createdAt: z
      .string()
      .regex(
        /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(202[3-9]|20[3-9]\d|2[1-9]\d{2}|[3-9]\d{3})/
      ),
    itineraryName: itineraryNameSchema,
  })
  .array()

export type DashboardUsersList = z.infer<typeof dashboardUsersListSchema>
