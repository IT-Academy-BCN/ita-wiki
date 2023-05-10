import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema, resourcesGetSchemaParams } from '../../../schemas'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}`,
  description: 'Returns a collection of resources based on type and topic',
  summary: 'Returns a collection of resources',
  request: {
  query: resourcesGetSchemaParams
  },
  responses: {
    200: {
      description: 'Sucessful operation',
      content: {
        'application/json': {
          schema: z.object({
            resources: z.array(resourceGetSchema)
          })
        },
      }
    },
    500: {
      description: 'Internal error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: "{\"message\":\"\\nInvalid `.findMany()` invocation in\\n/ita-wiki/back/src/controllers/getResourcesController.ts:27:8\\n" }),
          }),
        },
      },
    },
  },
})
