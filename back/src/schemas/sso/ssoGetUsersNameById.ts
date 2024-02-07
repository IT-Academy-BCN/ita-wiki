import { z } from '../../openapi/zod'
import { userId, userSchema } from '../users/userSchema'

const ssoGetUsersNameByIdRequestSchema = userId.array()
export type TSsoGetUsersNameByIdRequest = z.infer<
  typeof ssoGetUsersNameByIdRequestSchema
>

const ssoGetUsersNameByIdResponseSchema = userSchema
  .pick({
    id: true,
  })
  .extend({ name: z.string() })
  .array()

export type TSsoGetUsersNameByIdResponse = z.infer<
  typeof ssoGetUsersNameByIdResponseSchema
>
