import { knexResourceSchema } from './resourceSchema'

export const generateDescriptionSchema = knexResourceSchema.omit({
  id: true,
  slug: true,
  resource_type: true,
  category_id: true,
  description: true,
  created_at: true,
  updated_at: true,
  user_id: true,
  topics: true,
})
