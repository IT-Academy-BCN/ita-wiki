import { ResourceSchema } from './ResourceSchema'

export const CreateResourceSchema = ResourceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
