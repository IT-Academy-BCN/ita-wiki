import { z } from '../../openapi/zod'
import { dniSchema } from '../dniSchema'

export const userSchema = z.object({
  id: z.string().cuid(),
  dni: dniSchema,
  email: z.string().email().nonempty().openapi({ example: 'user@example.cat' }),
  password: z.string().min(8),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
