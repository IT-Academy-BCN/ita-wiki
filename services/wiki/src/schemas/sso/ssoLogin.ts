import { userSchema } from '..'
import { z } from '../../openapi/zod'
import { userLoginSchema } from '../users/userLoginSchema'

export type TSsoLoginRequest = z.infer<typeof userLoginSchema>

export const ssoLoginResponseSchema = userSchema.pick({ id: true }).extend({
  authToken: z.string().nonempty(),
  refreshToken: z.string().nonempty(),
})

export type TSsoLoginResponse = z.infer<typeof ssoLoginResponseSchema>
