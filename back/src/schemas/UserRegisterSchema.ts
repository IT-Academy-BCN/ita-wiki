import { UserSchema } from './UserSchema'
import { z } from '../openapi/zod'

export const UserRegisterSchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  dni: true,
}).extend({
    specialization: z.string()
})
