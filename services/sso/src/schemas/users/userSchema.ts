import { z } from '../../openapi/zod'
import { dniSchema } from '../dniSchema'

export enum UserRole {
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR',
  REGISTERED = 'REGISTERED',
}
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
}
export const userStatusSchema = z.nativeEnum(UserStatus)
export const userRoleSchema = z.nativeEnum(UserRole)
export const userIdSchema = z.string().cuid2().openapi({
  example: 'b6z2od3ut12qs0ilem6njgjp',
})
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
  role: userRoleSchema,
  status: userStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime(),
  itineraryId: z.string().cuid2(),
})
export const userDeletedAtSchema = z.string().nullable()

export type User = z.infer<typeof userSchema>
