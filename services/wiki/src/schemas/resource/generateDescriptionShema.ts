import { knexResourceSchema } from './resourceSchema'

export const generateDescriptionSchema = knexResourceSchema.pick({
  url: true,
  title: true,
  topic: true,
})
