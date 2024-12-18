import { z } from '../../openapi/zod'
import { knexTopicSchema, topicSchema } from '../topic/topicSchema'
import { knexUserSchema, userSchema } from '../users/userSchema'
import { voteCountSchema } from '../voteCountSchema'
import { knexResourceSchema, resourceSchema } from './resourceSchema'

export const resourceGetSchema = resourceSchema.extend({
  user: z.object({
    name: userSchema.shape.name,
    id: userSchema.shape.id,
  }),
  topics: z.array(z.object({ topic: topicSchema })),
  voteCount: voteCountSchema,
  isFavorite: z.boolean().default(false),
})

export const knexResourceGetSchema = knexResourceSchema.extend({
  user: z.object({
    name: knexUserSchema.shape.name,
    id: knexUserSchema.shape.id,
  }),
  topics: z.array(knexTopicSchema),
  voteCount: voteCountSchema,
  isFavorite: z.boolean().default(false),
})
