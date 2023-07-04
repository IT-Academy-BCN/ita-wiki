import { z } from '../../openapi/zod'

export const patchResourceSchema = z
  .object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
    topicId: z.string().optional(),
    resourceType: z.enum(['BLOG', 'VIDEO', 'TUTORIAL']).optional(),
  })
  .strict()
