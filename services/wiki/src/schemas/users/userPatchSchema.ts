import { z } from '../../openapi/zod'
import { userSchema } from './userSchema'

const basePatchSchema = userSchema.pick({ id: true })
const optionalUserSchema = userSchema
  .omit({
    id: true,
    specialization: true,
    updatedAt: true,
    createdAt: true,
  })
  .extend({ specializationId: z.string().cuid() })
  .partial()
export const userPatchSchema = basePatchSchema
  .merge(optionalUserSchema)
  .strict()

export type UserPatchSchema = z.infer<typeof userPatchSchema>
