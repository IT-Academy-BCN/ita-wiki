import { categorySchema } from './categorySchema'

export const categoryCreateSchema = categorySchema.pick({
  name: true,
})
