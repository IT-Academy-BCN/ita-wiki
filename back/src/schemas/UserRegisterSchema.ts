import { UserSchema } from './UserSchema'
import { z } from '../openapi/zod'
import { passwordRegex } from './regex/passwordRegex'

export const UserRegisterSchema = UserSchema.pick({
  email: true,
  name: true,
  dni: true,
}).extend({
    specialization: z.string(),
    password: z.string().min(8).regex(passwordRegex),
})
