import { topicSchema } from './topicSchema'

export const topicCreateSchema = topicSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
})
