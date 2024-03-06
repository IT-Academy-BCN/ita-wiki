import { categorySchema } from './categorySchema'

export const categoryCreateSchema = categorySchema.omit({
  id: true,
  slug: true,
  topics: true,
  createdAt: true,
  updatedAt: true,
})
