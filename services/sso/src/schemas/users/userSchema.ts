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
export const userStatusSchema = z.nativeEnum(UserStatus)
export const userIdSchema = z.string().cuid2()
export const userNameSchema = z
  .string()
  .nonempty()
  .openapi({ example: 'John Doe' })
export const userSchema = z.object({
  id: userIdSchema,
  dni: dniSchema,
  email: z.string().email().nonempty().openapi({ example: 'user@example.cat' }),
  name: userNameSchema,
  password: z.string().min(8),
  role: z.nativeEnum(UserRole),
  status: userStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  itineraryId: z.string().cuid2(),
})

export type User = z.infer<typeof userSchema>
