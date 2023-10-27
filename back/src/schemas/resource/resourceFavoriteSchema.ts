// import { userSchema } from '../users/userSchema'
import { voteCountSchema } from '../voteCountSchema'
import { resourceSchema } from './resourceSchema'

export const resourceFavoriteSchema = resourceSchema.extend({
  voteCount: voteCountSchema,
})
