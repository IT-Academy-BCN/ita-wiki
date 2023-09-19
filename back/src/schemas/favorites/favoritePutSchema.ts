import { resourceSchema } from '../resource/resourceSchema'

export const favoritePutSchema = resourceSchema.omit({
  title: true,
  slug: true,
  url: true,
  resourceType: true,
  status: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
})
