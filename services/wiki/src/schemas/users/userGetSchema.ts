import { userSchema } from './userSchema'

export const userGetSchema = userSchema.pick({
  id: true,
  name: true,
  dni: true,
  email: true,
  role: true,
  status: true,
})
