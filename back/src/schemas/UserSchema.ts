import { z } from '../openapi/zod'
import { DNISchema } from './DNISchema'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.date(),
  updatedAt: z.date(),
  dni: DNISchema,
  role: z.enum(['ADMIN', 'REGISTERED'])
});
