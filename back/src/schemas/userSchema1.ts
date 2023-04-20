import { z } from '../openapi/zod'
import { dniSchema } from './dniSchema1'

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  dni: dniSchema,
  password: z.string().min(8),
  name: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  role: z.enum(['ADMIN', 'REGISTERED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});
