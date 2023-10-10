import { z } from '../../openapi/zod'

export const resourceSchema = z.object({
  id: z.string().cuid(),
  title: z.string().openapi({ example: 'My Resource in Javascript' }),
  slug: z.string().openapi({ example: 'my-resource-in-javascript' }),
  description: z
    .string()
    .nullable()
    .optional()
    .openapi({ example: 'Lorem ipsum javascript' }),
  url: z
    .string()
    .url()
    .openapi({ example: 'https://tutorials.cat/learn/javascript' }),
  resourceType: z.enum(['BLOG', 'VIDEO', 'TUTORIAL']),
  userId: z.string().cuid(),
  categoryId: z.string().cuid(),
  createdAt: z.union([z.string().datetime(), z.date()]),
  updatedAt: z.union([z.string().datetime(), z.date()]),
  status: z
    .enum(['SEEN', 'NOT_SEEN'])
    .optional()
    .openapi({ example: 'NOT_SEEN' }),
})

export type TResourceSchema = z.infer<typeof resourceSchema>
