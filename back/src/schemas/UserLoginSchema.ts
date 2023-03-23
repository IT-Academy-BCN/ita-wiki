import { UserSchema } from './UserSchema'

export const UserLoginSchema = UserSchema.pick({ dni: true, password: true })
