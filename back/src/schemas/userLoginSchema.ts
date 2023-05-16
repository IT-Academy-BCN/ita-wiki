import { userSchema } from './userSchema'

export const userLoginSchema = userSchema.pick({
  dni: true,
  password: true,
})
