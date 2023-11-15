import { z } from '../../openapi/zod'

export const topicPatchSchema = z
  .object({
    id: z.string(),
    // why name is optional?
    name: z.string().openapi({ example: 'Advanced React Props' }).optional(),
    categoryId: z.string().optional(),
  })
  .strict()
