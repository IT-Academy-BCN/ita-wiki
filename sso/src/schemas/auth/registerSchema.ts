import z from 'zod'
import { userSchema } from '../user/userSchema'
import { passwordRegex } from '../passwordRegex'

export const registerSchema = userSchema
  .pick({
    dni: true,
    email: true,
    name: true,
    itineraryId: true,
  })
  .extend({
    password: z.string().min(8).regex(passwordRegex),
    confirmPassword: z.string().min(8).regex(passwordRegex),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type UserRegister = z.infer<typeof registerSchema>
