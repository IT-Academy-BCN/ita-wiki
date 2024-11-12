import { z } from '../../openapi/zod'
import { knexResourceSchema, resourceSchema } from './resourceSchema'

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
export const knexResourceCreateSchema = knexResourceSchema
  .omit({
    id: true,
    slug: true,
    created_at: true,
    updated_at: true,
    user_id: true,
  })
  .extend({
    topics: z.array(
      z.string().cuid().openapi({ example: 'clocr0bpv000ah8vwnfvpo24p' })
    ), // Son las FK
  })
