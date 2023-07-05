import { z } from '../../openapi/zod'
import { topicSchema } from '../topicSchema'
import { userSchema } from '../userSchema'
import { voteCountSchema } from '../voteCountSchema'
import { resourceSchema } from './resourceSchema'

export const resourceGetSchema = resourceSchema
  .omit({
    userId: true,
    topics: true,
  })
  .extend({
    user: userSchema.pick({
      name: true,
      email: true,
    }),
    topics: z.array(topicSchema),
    // topics: z.array(z.object({ topic: topicSchema })),
    voteCount: voteCountSchema,
  })
