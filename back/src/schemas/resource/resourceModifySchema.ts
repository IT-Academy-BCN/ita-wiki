import { z } from '../../openapi/zod'

export const resourceModifySchema = z.object({
    id: z.string(),
    title: z.string()
        .nullish(),
    description: z
        .string()
        .nullish(),
    url: z.string()
        .nullish(),
    topic: z.string()
        .nullish(),
    resourceType: z.enum(['BLOG', 'VIDEO', 'TUTORIAL'])
        .nullish(),
    userId: z.string(),
})