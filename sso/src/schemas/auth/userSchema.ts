import { z } from '../../openapi/zod'
import { dniSchema } from '../dniSchema'

export enum UserRole {
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR',
  REGISTERED = 'REGISTERED',
}
export const userSchema = z.object({
  id: z.string().cuid2(),
  dni: dniSchema,
  email: z.string().email().nonempty().openapi({ example: 'user@example.cat' }),
  password: z.string().min(8),
  role: z.nativeEnum(UserRole),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  itineraryId: z.string().cuid2(),
})

export type User = z.infer<typeof userSchema>
