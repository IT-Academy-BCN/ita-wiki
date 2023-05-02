import { z } from '../openapi/zod'

export const topicSchema = z.object({
  id: z.string(),
  topic: z.string(),
  slug: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
