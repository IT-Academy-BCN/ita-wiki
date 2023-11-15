import { userSchema } from '../userSchema'
import { z } from '../../openapi/zod'

export const loginSchema = userSchema.pick({ dni: true, password: true })

export const loginResponseSchema = z.object({
  authToken: z.string(),
  refreshToken: z.string(),
})
