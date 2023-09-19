import { userSchema } from './userSchema'
import { z } from '../../openapi/zod'
import { passwordRegex } from '../regex/passwordRegex'

export const userRegisterSchema = userSchema
  .pick({
    email: true,
    dni: true,
    specialization: true,
  })
  .extend({
    name: z.string(),
    accept: z.literal<boolean>(true),
    password: z.string().min(8).regex(passwordRegex),
    confirmPassword: z.string().min(8).regex(passwordRegex),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type UserRegister = z.infer<typeof userRegisterSchema>
