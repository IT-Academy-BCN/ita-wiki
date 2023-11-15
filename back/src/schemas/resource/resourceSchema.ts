import { z } from '../../openapi/zod'

export const resourceSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .openapi({ example: 'My Resource in Javascript' })
    .min(2, 'category name must have more than 2 letters'),
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
  categoryId: z
    .string()
    .cuid()
    .openapi({ example: 'clocr0bi20000h8vwipfbazso' }),
  createdAt: z.union([z.string().datetime(), z.date()]),
  updatedAt: z.union([z.string().datetime(), z.date()]),
})

export type TResourceSchema = z.infer<typeof resourceSchema>
