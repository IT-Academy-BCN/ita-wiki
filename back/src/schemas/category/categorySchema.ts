import { z } from '../../openapi/zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z
    .string()
    .openapi({ example: 'React' })
    .nonempty()
    .refine((data) => data.trim().length > 2, {
      message: 'Name must have more than two characters and cannot be empty',
    }),
  slug: z.string().optional().openapi({ example: 'react' }),
  topics: z.array(
    z.object({
      id: z.string().cuid(),
    })
  ),
  createdAt: z.union([z.string().datetime(), z.date()]),
  updatedAt: z.union([z.string().datetime(), z.date()]),
})
