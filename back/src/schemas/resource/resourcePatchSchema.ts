import { z } from '../../openapi/zod'
// import { resourceSchema } from './resourceSchema'

export const resourcePatchSchema = z
  .object({
    id: z.string(),
    title: z
      .string()
      .optional()
      .refine(
        (data) =>
          data === undefined || (data.trim().length > 2 && data.trim() !== ''),
        {
          message:
            'Title must have more than two characters and cannot be empty',
        }
      ),
    description: z.string().optional(),
    url: z.string().optional(),
    topicId: z.string().optional(),
    resourceType: z.enum(['BLOG', 'VIDEO', 'TUTORIAL']).optional(),
  })
  .strict()
