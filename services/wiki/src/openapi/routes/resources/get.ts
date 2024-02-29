import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema, resourcesGetParamsSchema } from '../../../schemas'
import {
  invalidTokenResponse,
  zodValidationErrorResponse,
} from '../../components/responses/authMiddleware'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}`,
  description:
    'Returns a collection of resources. Filters by resource type, topic name and category slug are optional. Resources that match all filters are fetched.',
  summary: 'Returns a collection of resources',
  request: {
    query: resourcesGetParamsSchema,
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
    498: invalidTokenResponse,
  },
})
