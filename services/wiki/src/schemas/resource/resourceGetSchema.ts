import { z } from '../../openapi/zod'
import { topicSchema } from '../topic/topicSchema'
import { userSchema } from '../users/userSchema'
import { voteCountSchema } from '../voteCountSchema'
import { resourceSchema } from './resourceSchema'

const userSchemaModified = z.object({
  name: userSchema.shape.name.optional(),
})

export const resourceGetSchema = resourceSchema.extend({
  user: userSchemaModified,
  topics: z.array(z.object({ topic: topicSchema })),
  voteCount: voteCountSchema,
  isFavorite: z.boolean().default(false),
})
