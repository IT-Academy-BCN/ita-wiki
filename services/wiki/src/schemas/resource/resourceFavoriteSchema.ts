import { z } from 'zod'
import { knexTopicSchema, topicSchema } from '../topic/topicSchema'
import { knexVoteCountSchema, voteCountSchema } from '../voteCountSchema'
import { knexResourceSchema, resourceSchema } from './resourceSchema'
import { knexUserSchema, userSchema } from '../users/userSchema'

export const resourceFavoriteSchema = resourceSchema.extend({
  user: z.object({
    id: userSchema.shape.id,
    name: userSchema.shape.name,
  }),
  isAuthor: z.boolean(),
  voteCount: voteCountSchema,
  topics: z.array(z.object({ topic: topicSchema })),
})
export const knexResourceFavoriteSchema = knexResourceSchema.extend({
  user: z.object({
    id: knexUserSchema.shape.id,
    name: knexUserSchema.shape.name,
  }),
  isAuthor: z.boolean(),
  vote_count: knexVoteCountSchema,
  topics: z.array(knexTopicSchema),
})
