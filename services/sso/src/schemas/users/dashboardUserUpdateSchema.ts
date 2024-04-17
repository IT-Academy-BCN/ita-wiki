import { optionalUserUpdateSchema } from './userUpdateSchema'

const optionalKeys = optionalUserUpdateSchema.keyof().options
export const dashboardUserUpdateSchema = optionalUserUpdateSchema.refine(
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
