import { z } from '../../openapi/zod'

export const topicPatchSchema = z
  .object({
    id: z.string(),
    name: z.string().openapi({ example: 'Advanced React Props' }).optional(),
    categoryId: z.string().optional(),
  })
  .strict()
