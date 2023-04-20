import { userSchema } from './userSchema1'
import { z } from '../openapi/zod'
import { passwordRegex } from './regex/passwordRegex'

export const userRegisterSchema = userSchema.pick({
  email: true,
  name: true,
  dni: true
}).extend({
  specialization: z.string(),
  password: z.string().min(8).regex(passwordRegex)
})
