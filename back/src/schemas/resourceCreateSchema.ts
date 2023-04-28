import { z } from '../openapi/zod'
import { resourceSchema } from './resourceSchema'

export const resourceCreateSchema = resourceSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  userId: true
}).extend({
  topics: z.array(z.string()), // Son las FK
  userEmail: z.string() // userID nunca llega al front, hay que recuperar la FK por email
})
