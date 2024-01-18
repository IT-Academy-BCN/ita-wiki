import { userSchema } from '..'
import { z } from '../../openapi/zod'
import { ssoLoginResponseSchema } from './ssoLogin'

const ssoGetUserRequestSchema = ssoLoginResponseSchema.pick({
  authToken: true,
})
export type TSsoGetUserRequest = z.infer<typeof ssoGetUserRequestSchema>

const ssoGetUserResponseSchema = userSchema.pick({
  dni: true,
  email: true,
  role: true,
})

export type TSsoGetUserResponse = z.infer<typeof ssoGetUserResponseSchema>
