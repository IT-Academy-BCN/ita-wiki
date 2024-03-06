import { userSchema } from '..'
import { z } from '../../openapi/zod'
import { userRegSchema } from '../users/userRegisterSchema'

const ssoRegisterRequestSchema = userRegSchema.pick({
  dni: true,
  email: true,
  name: true,
  itineraryId: true,
  password: true,
  confirmPassword: true,
})
export type TSsoRegisterRequest = z.infer<typeof ssoRegisterRequestSchema>

const ssoRegisterResponseSchema = userSchema.pick({ id: true })

export type TSsoRegisterResponse = z.infer<typeof ssoRegisterResponseSchema>
