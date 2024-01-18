import z from 'zod'
import { userSchema } from './userSchema'
import { validateSchema } from '../token/validateSchema'

const basePatchSchema = userSchema.pick({ id: true })
const optionalUserSchema = userSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial()
const optionalKeys = optionalUserSchema.keyof().options
const mergedSchema = basePatchSchema
  .merge(validateSchema)
  .merge(optionalUserSchema)
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
