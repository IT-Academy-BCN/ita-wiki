import { z } from '../../openapi/zod'
import { dniSchema } from '../dniSchema'

export const userSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email().openapi({ example: 'user@example.cat' }),
  dni: dniSchema,
  password: z.string().min(8),
  name: z.string().optional(),
  avatarId: z.string().optional().nullable(),
  itineraryId: z.string().nonempty().cuid(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  role: z.enum(['ADMIN', 'REGISTERED', 'MENTOR']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
