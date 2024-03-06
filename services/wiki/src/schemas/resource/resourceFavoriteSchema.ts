// import { userSchema } from '../users/userSchema'
import { z } from 'zod'
import { topicSchema } from '../topic/topicSchema'
import { voteCountSchema } from '../voteCountSchema'
import { resourceSchema } from './resourceSchema'

export const resourceFavoriteSchema = resourceSchema
  .omit({
    userId: true,
  })
  .extend({
    user: z.object({
      name: z.string(),
      avatarId: z.string().nullable(),
    }),
    isAuthor: z.boolean(),
    voteCount: voteCountSchema,
    topics: z.array(z.object({ topic: topicSchema })),
  })
