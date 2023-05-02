import { z } from '../../openapi/zod'

export const resourceSchema = z.object({
  id: z.string(),
  title: z.string().openapi({example: 'My Resource in Javascript'}),
  slug: z.string().optional().openapi({example: 'my-resource-in-javascript'}),
  description: z.string().optional().openapi({example: 'Lorem ipsum javascript'}),
  url: z.string().url().openapi({example: 'https://tutorials.cat/learn/javascript'}),
  resourceType: z.enum(['BLOG', 'VIDEO', 'TUTORIAL']),
  topics: z.array(z.object({
    id: z.string().cuid()
  })),
  userId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});
