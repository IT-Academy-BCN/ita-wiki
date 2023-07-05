import { resourcePatchSchema } from './resourcePatchSchema'

export const resourceDeleteSchema = resourcePatchSchema.omit({
  title: true,
  description: true,
  url: true,
  topicId: true,
  resourceType: true,
})
