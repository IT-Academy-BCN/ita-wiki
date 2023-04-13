import { z } from '../openapi/zod'

export const TopicSchema = z.object({
  id: z.string(),
  topic: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});
