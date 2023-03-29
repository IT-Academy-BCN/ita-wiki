import { UserSchema } from './UserSchema'
import { z } from '../openapi/zod'
import { passwordRegex } from './regex/passwordRegex'

export const UserLoginSchema = UserSchema.pick({ 
    dni: true,
}).extend({
    password: z.string().min(8).regex(passwordRegex),
})
