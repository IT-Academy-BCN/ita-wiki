import { z } from '../../openapi/zod'
import { dniSchema } from '../dniSchema'

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email().openapi({ example: 'user@example.cat' }),
  dni: dniSchema,
  password: z.string().min(8),
  name: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  role: z.enum(['ADMIN', 'REGISTERED', 'MENTOR']),
  createdAt: z.date(),
  updatedAt: z.date(),
})
