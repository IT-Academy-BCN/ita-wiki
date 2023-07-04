<<<<<<< HEAD
import { resourceModifySchema } from './resourceModifySchema'

export const resourceDeleteSchema = resourceModifySchema
    .omit({
        title: true,
        description: true,
        url: true,
        topic: true,
        resourceType: true,
    })
=======
import { patchResourceSchema } from './resourcePatchSchema'

export const resourceDeleteSchema = patchResourceSchema.omit({
  title: true,
  description: true,
  url: true,
  topic: true,
  resourceType: true,
})
>>>>>>> 5b7c4a3dc25c41f07ae6bf1aa7e8e9b2293ffbf1
