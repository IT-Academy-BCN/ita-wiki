import { z } from '../../openapi/zod'

export const topicPatchSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    categoryId: z.string().optional(),
  })
  .strict()
