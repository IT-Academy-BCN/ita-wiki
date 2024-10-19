import z from 'zod'
import { userSchema } from '../users/userSchema'
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

export type TUserRegister = z.infer<typeof registerSchema>
