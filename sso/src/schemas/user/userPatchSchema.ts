import z from 'zod'
import { userSchema } from './userSchema'
import { validateSchema } from '../token/validateSchema'

const basePatchSchema = userSchema.pick({ id: true })
export const optionalUserPatchSchema = userSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial()
const optionalKeys = optionalUserPatchSchema.keyof().options
const mergedSchema = basePatchSchema
  .merge(validateSchema)
  .merge(optionalUserPatchSchema)
  .strict()
export const userPatchSchema = mergedSchema.refine(
  (data) => {
    return optionalKeys.some((key) => data[key] !== undefined)
  },
  {
    message: `At least one of the following properties is required: ${optionalKeys.join(
      ', '
    )}`,
    path: optionalKeys,
  }
)

export type UserPatch = z.infer<typeof userPatchSchema>
