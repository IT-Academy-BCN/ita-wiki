import { z } from '../../openapi/zod'

export const topicSchema = z.object({
  id: z.string().cuid(),
  name: z.string().openapi({ example: 'React Props' }).nonempty(),
  slug: z.string().optional().openapi({ example: 'react-props' }),
  categoryId: z.string().cuid(),
  createdAt: z.union([z.string().datetime(), z.date()]),
  updatedAt: z.union([z.string().datetime(), z.date()]),
})
