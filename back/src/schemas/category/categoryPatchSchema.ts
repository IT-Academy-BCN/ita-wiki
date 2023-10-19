import { categorySchema } from './categorySchema'

export const categoryPatchSchema = categorySchema.omit({
  id: true,
  slug: true,
  topics: true,
  createdAt: true,
  updatedAt: true,
})
