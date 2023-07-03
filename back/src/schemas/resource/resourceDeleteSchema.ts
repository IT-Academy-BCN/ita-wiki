import { resourceModifySchema } from './resourceModifySchema'

export const resourceDeleteSchema = resourceModifySchema
    .omit({
        title: true,
        description: true,
        url: true,
        topic: true,
        resourceType: true,
    })