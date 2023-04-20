import { userSchema } from './userSchema1'

export const userLoginSchema = userSchema.pick({
  dni: true,
  password: true
})
