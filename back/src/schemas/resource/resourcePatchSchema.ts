import { z } from '../../openapi/zod'
// import { resourceSchema } from './resourceSchema'

export const resourcePatchSchema = z
  .object({
    id: z.string(),
    title: z
      .string()
      .trim()
      .min(2, 'resource title should have more than 2 letters')
      .optional(),
    description: z.string().optional(),
    url: z.string().optional(),
    topicId: z.string().optional(),
    resourceType: z.enum(['BLOG', 'VIDEO', 'TUTORIAL']).optional(),
  })
  .strict()
