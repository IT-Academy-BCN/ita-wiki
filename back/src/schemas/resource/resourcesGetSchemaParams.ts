import { z } from '../../openapi/zod'

export const resourcesGetSchemaParams = z.object({
  resourceType: z.enum(['BLOG', 'VIDEO', 'TUTORIAL']).optional().openapi({ example: 'BLOG' }),
  topic: z.string().optional().openapi({ example: 'Listas' }),
});