import { z } from '../openapi/zod'

export const resourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
  resourceType: z.enum(['BLOG', 'VIDEO', 'TUTORIAL']),
  topics: z.array(z.object({
    id: z.string()
  })),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});
