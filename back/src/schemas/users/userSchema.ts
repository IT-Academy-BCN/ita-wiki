import { z } from '../../openapi/zod'
import { dniSchema } from '../dniSchema'

export enum UserRole {
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR',
  REGISTERED = 'REGISTERED',
}
export const userId = z.string().cuid2()
export const userSchema = z.object({
  id: userId,
  email: z.string().email().openapi({ example: 'user@example.cat' }),
  dni: dniSchema,
  password: z.string().min(8),
  name: z.string().optional(),
  avatarId: z.string().optional().nullable(),
  itineraryId: z.string().nonempty().cuid(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  role: z.nativeEnum(UserRole),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
