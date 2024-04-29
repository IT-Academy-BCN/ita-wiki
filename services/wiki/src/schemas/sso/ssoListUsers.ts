import { z } from '../../openapi/zod'
import { userId, userSchema } from '../users/userSchema'

export const ssoGetUsersNameByIdRequestSchema = userId.array()
export type TSsoGetUsersNameByIdRequest = z.infer<
  typeof ssoGetUsersNameByIdRequestSchema
>

const ssoListUsersResponseSchema = userSchema
  .pick({
    id: true,
  })
  .extend({ name: z.string() })
  .array()

export type TSsoListUsersResponse = z.infer<typeof ssoListUsersResponseSchema>
