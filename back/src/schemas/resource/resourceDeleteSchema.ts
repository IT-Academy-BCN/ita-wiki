import { patchResourceSchema } from './resourcePatchSchema'

export const resourceDeleteSchema = patchResourceSchema.omit({
  title: true,
  description: true,
  url: true,
  topic: true,
  resourceType: true,
})
