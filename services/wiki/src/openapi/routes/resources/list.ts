import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema, resourcesListParamsSchema } from '../../../schemas'
import {
  invalidTokenResponse,
  zodValidationErrorResponse,
} from '../../components/responses/authMiddleware'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}`,
  operationId: 'listResources',
  description:
    'Returns a collection of resources. Filters by resource type, topic name and category slug are optional. Resources that match all filters are fetched.',
  summary: 'Returns a collection of resources',
  request: {
    query: resourcesListParamsSchema,
  },
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': {
          schema: z.array(resourceGetSchema),
        },
      },
    },
    400: zodValidationErrorResponse,
    401: invalidTokenResponse,
  },
})
