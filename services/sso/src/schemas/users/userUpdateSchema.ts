import z from 'zod'
import { userSchema } from './userSchema'
import { validateSchema } from '../tokens/validateSchema'

export const optionalUserUpdateSchema = userSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial()
const optionalKeys = optionalUserUpdateSchema.keyof().options
const mergedSchema = validateSchema.merge(optionalUserUpdateSchema).strict()
export const userUpdateSchema = mergedSchema.refine(
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

export type UserPatch = z.infer<typeof optionalUserUpdateSchema>
