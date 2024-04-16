import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  userNotFoundResponse,
} from '../../components/responses/authMiddleware'
import { registry } from '../../registry'
import { z } from '../../zod'

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
    401: invalidTokenResponse,
    404: userNotFoundResponse,
  },
})
