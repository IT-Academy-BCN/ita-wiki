import { z } from '../../openapi/zod'
import { resourceSchema } from './resourceSchema'

export const resourceCreateSchema = resourceSchema
  .omit({
    id: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
  })
  .extend({
    topics: z.array(z.string().cuid()), // Son las FK
  })
