import { z } from '../openapi/zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  topics: z.array(z.object({
    id: z.string().cuid()
  })),
  createdAt: z.date(),
  updatedAt: z.date()
});