import { z } from '../../openapi/zod'
import { userSchema } from './userSchema'

const basePatchSchema = userSchema.pick({ id: true })
const optionalUserSchema = userSchema
  .omit({ id: true, avatarId: true, specialization: true })
  .extend({ specializationId: z.string().cuid() })
  .partial()
export const userPatchSchema = basePatchSchema
  .merge(optionalUserSchema)
  .strict()
