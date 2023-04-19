import { ResourceSchema } from './ResourceSchema'

export const ResourceCreateSchema = ResourceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
