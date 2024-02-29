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
    topics: z.array(
      z.string().cuid().openapi({ example: 'clocr0bpv000ah8vwnfvpo24p' })
    ), // Son las FK
  })
