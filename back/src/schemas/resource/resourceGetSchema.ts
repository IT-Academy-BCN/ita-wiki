import { z } from '../../openapi/zod'
import { topicSchema } from '../topicSchema'
import { userSchema } from '../userSchema'
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
    topics: z.array(
      topicSchema.extend({
        categoryId: z.string().cuid(),
      })
    ),
  })
