import { z } from '../../openapi/zod'
import { topicSchema } from '../topic/topicSchema'
import { userSchema } from '../users/userSchema'
import { voteCountSchema } from '../voteCountSchema'
import { resourceSchema } from './resourceSchema'

export const resourceGetSchema = resourceSchema.extend({
  user: userSchema.pick({
    name: true,
  }),
  topics: z.array(z.object({ topic: topicSchema })),
  voteCount: voteCountSchema,
  isFavorite: z.boolean().default(false),
})
