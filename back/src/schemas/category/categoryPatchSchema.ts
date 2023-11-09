import { categorySchema } from './categorySchema'

export const categoryPatchSchema = categorySchema.pick({
  name: true,
})
