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
      name: z.string().optional(),
      avatarId: z.string().nullable().optional(),
    }),
    isAuthor: z.boolean(),
    voteCount: voteCountSchema,
    topics: z.array(z.object({ topic: topicSchema })),
  })
