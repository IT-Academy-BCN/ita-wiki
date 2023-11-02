// import { userSchema } from '../users/userSchema'
import { z } from 'zod'
import { topicSchema } from '../topic/topicSchema'
import { voteCountSchema } from '../voteCountSchema'
import { resourceSchema } from './resourceSchema'

export const resourceFavoriteSchema = resourceSchema.extend({
  voteCount: voteCountSchema,
  topics: z.array(z.object({ topic: topicSchema })),
})
