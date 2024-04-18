import { z } from '../../openapi/zod'
import { userIdSchema, userStatusSchema } from './userSchema'

export const dashboardUsersUpdateStatusSchema = z.object({
  ids: userIdSchema.array(),
  status: z.enum([userStatusSchema.enum.ACTIVE, userStatusSchema.enum.BLOCKED]),
})

export type DashboardUsersUpdateStatus = z.infer<
  typeof dashboardUsersUpdateStatusSchema
>
