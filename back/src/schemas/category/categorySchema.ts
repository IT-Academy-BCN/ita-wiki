import { z } from '../../openapi/zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z
    .string()
    .openapi({ example: 'React' })
    .min(2, 'category name must ahve more than 2 letters'),
  slug: z.string().optional().openapi({ example: 'react' }),
  topics: z.array(
    z.object({
      id: z.string().cuid(),
    })
  ),
  createdAt: z.union([z.string().datetime(), z.date()]),
  updatedAt: z.union([z.string().datetime(), z.date()]),
})
