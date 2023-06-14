import { z } from '../../openapi/zod'

export const resourcesGetParamsSchema = z.object({
  resourceType: z
    .enum(['BLOG', 'VIDEO', 'TUTORIAL'])
    .optional()
    .openapi({ example: 'BLOG' }),
  topic: z.string().optional().openapi({ example: 'Listas' }),
  category: z.string().optional().openapi({ example: 'javascript' }),
  status: z.enum(['seen', 'not_seen']).openapi({ example: 'not_seen' }),
})
