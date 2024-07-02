import { z } from '../../openapi/zod'
import { topicSchema } from '../topic/topicSchema'
import { userSchema } from '../users/userSchema'
import { voteCountSchema } from '../voteCountSchema'
import { resourceSchema } from './resourceSchema'

export const resourceGetSchema = resourceSchema.extend({
  user: z.object({
    name: userSchema.shape.name,
    id: userSchema.shape.id,
  }),
  topics: z.array(z.object({ topic: topicSchema })),
  voteCount: voteCountSchema,
  isFavorite: z.boolean().default(false),
})
