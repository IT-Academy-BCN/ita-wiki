import z from 'zod'
import { pathRoot } from '../../../../routes/routes'
import { cookieAuth } from '../../../components/cookieAuth'
import {
  invalidTokenResponse,
  userNotFoundResponse,
} from '../../../components/responses'
import { registry } from '../../../registry'
import { userIdSchema } from '../../../../schemas/users/userSchema'

registry.registerPath({
  method: 'delete',
  tags: ['dashboard'],
  path: `${pathRoot.v1.dashboard.users}/`,
  description: 'Soft deletes a collection of users',
  summary: 'Delete a collection of users',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ body: z.object({ ids: userIdSchema.array() }) }),
        },
      },
    },
  },
  security: [{ [cookieAuth.name]: [] }],
  responses: {
    204: {
      description: 'Collection of users has been soft deleted',
    },
    401: invalidTokenResponse,
    404: userNotFoundResponse,
    500: {
      description: 'Other error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Database error' }),
          }),
        },
      },
    },
  },
})
