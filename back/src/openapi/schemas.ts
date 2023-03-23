import * as Schemas from '../schemas'
import { registry } from './utils'

export const UserSchema = registry.register('User', Schemas.UserSchema)
export const DNISchema = registry.register('DNI', Schemas.DNISchema)
