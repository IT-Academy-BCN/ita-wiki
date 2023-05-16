import { resourceSchema } from '../../../schemas'
import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
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
          schema: resourceSchema.omit({
            topics: true,
          }),
        },
      },
    },
    401: missingTokenResponse,
    405: invalidTokenResponse,
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'User not found' }),
          }),
        },
      },
    },
  },
})
