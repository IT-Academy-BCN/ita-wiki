import { userSchema } from '../userSchema'

export const loginSchema = userSchema.pick({ dni: true, password: true })
