import { z } from '../openapi/zod'

export const topicSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  slug: z.string().optional(),
  categoryId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
