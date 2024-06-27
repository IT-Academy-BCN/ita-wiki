// import { userSchema } from '../users/userSchema'
import { z } from 'zod'
import { topicSchema } from '../topic/topicSchema'
import { voteCountSchema } from '../voteCountSchema'
import { resourceSchema } from './resourceSchema'
import { userSchema } from '../users/userSchema'

export const resourceFavoriteSchema = resourceSchema.extend({
  user: z.object({
    id: userSchema.shape.id,
    name: userSchema.shape.name,
  }),
  isAuthor: z.boolean(),
  voteCount: voteCountSchema,
  topics: z.array(z.object({ topic: topicSchema })),
})
