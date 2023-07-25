import { userSchema } from './userSchema'
import { z } from '../../openapi/zod'
import { passwordRegex } from '../regex/passwordRegex'

export const userRegisterSchema = userSchema
  .pick({
    email: true,
    name: true,
    dni: true,
    specialization: true,
  })
  .extend({
    password: z.string().min(8).regex(passwordRegex),
  })
