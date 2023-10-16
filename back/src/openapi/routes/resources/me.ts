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
  description: 'Returns all the posted resources by a logged in user.',
  summary: 'Get resources by logged in user',
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
