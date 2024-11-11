import { z } from '../../openapi/zod'
import { dniSchema } from '../dniSchema'

export enum UserRole {
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR',
  REGISTERED = 'REGISTERED',
}
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export const userId = z.string().cuid2()
export const userSchema = z.object({
  id: userId,
  email: z.string().email().openapi({ example: 'user@example.cat' }),
  dni: dniSchema,
  password: z.string().min(8),
  name: z.string().optional(),
  itineraryId: z.string().nonempty().cuid(),
  status: z.nativeEnum(UserStatus),
  role: z.nativeEnum(UserRole),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
export const knexUserSchema = z.object({
  id: userId,
  email: z.string().email().openapi({ example: 'user@example.cat' }),
  dni: dniSchema,
  password: z.string().min(8),
  name: z.string().optional(),
  itinerary_id: z.string().nonempty().cuid(),
  status: z.nativeEnum(UserStatus),
  role: z.nativeEnum(UserRole),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
