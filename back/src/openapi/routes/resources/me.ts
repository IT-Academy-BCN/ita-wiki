import { resourceGetSchema } from '../../../schemas'
import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
  userNotFoundResponse,
} from '../../components/responses/authMiddleware'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/me`,
  summary: 'Get resources by logged in user',
  description:
    'Returns all the posted resources by a logged in user. In addition, if categorySlug query provided, returns only the resources posted in that category.',
  request: {
    query: z.object({
      categorySlug: z.string().optional().openapi({ example: 'react' }),
    }),
  },
  security: [{ [cookieAuth.name]: [] }],
  responses: {
    200: {
      description: 'All resources posted by user are returned.',
      content: {
        'application/json': {
          schema: z.object({
            resources: z.array(resourceGetSchema),
          }),
        },
      },
    },
    401: missingTokenResponse,
    404: userNotFoundResponse,
    498: invalidTokenResponse,
  },
})
