import { z } from '../openapi/zod'

export const topicSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  categoryId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});
