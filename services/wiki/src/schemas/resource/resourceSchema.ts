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
  categoryId: z
    .string()
    .cuid()
    .openapi({ example: 'clocr0bi20000h8vwipfbazso' }),
  createdAt: z.union([z.string().datetime(), z.date()]),
  updatedAt: z.union([z.string().datetime(), z.date()]),
})

export type TResourceSchema = z.infer<typeof resourceSchema>

export const knexResourceSchema = z.object({
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
  resource_type: z.enum(['BLOG', 'VIDEO', 'TUTORIAL']),
  category_id: z
    .string()
    .cuid()
    .openapi({ example: 'clocr0bi20000h8vwipfbazso' }),
  created_at: z.union([z.string().datetime(), z.date()]),
  updated_at: z.union([z.string().datetime(), z.date()]),
})

export type TKnexResourceSchema = z.infer<typeof knexResourceSchema>
