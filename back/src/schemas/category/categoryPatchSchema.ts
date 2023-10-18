import { categorySchema } from './categorySchema'

export const categoryPatchSchema = categorySchema.omit({
  slug: true,
  topics: true,
  createdAt: true,
  updatedAt: true,
})
