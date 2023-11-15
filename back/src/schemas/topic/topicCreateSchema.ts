import { topicSchema } from './topicSchema'

export const topicCreateSchema = topicSchema.pick({
  name: true,
  categoryId: true,
})
