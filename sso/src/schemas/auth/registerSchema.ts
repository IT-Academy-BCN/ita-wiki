import z from 'zod'
import { userSchema } from '../user/userSchema'
import { passwordRegex } from '../passwordRegex'

export const registerSchema = userSchema
  .pick({
    dni: true,
    email: true,
    itineraryId: true,
  })
  .extend({
    // accept: z.literal<boolean>(true),
    password: z.string().min(8).regex(passwordRegex),
    confirmPassword: z.string().min(8).regex(passwordRegex),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type UserRegister = z.infer<typeof registerSchema>
