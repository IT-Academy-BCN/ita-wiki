import { userSchema } from '..'
import { z } from '../../openapi/zod'
import { ssoLoginResponseSchema } from './ssoLogin'

const ssoValidateRequestSchema = ssoLoginResponseSchema.pick({
  authToken: true,
})
export type TSsoValidateRequest = z.infer<typeof ssoValidateRequestSchema>

const ssoValidateResponseSchema = userSchema.pick({ id: true })

export type TSsoValidateResponse = z.infer<typeof ssoValidateResponseSchema>
