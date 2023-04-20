import { z } from '../openapi/zod'

export const topicSchema = z.object({
  id: z.string(),
  topic: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});
