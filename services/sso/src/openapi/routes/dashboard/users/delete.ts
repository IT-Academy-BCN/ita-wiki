import z from 'zod'
import { pathRoot } from '../../../../routes/routes'
import { cookieAuth } from '../../../components/cookieAuth'
import {
  deletedUsersResponse,
  invalidTokenResponse,
  userNotFoundResponse,
} from '../../../components/responses'
import { registry } from '../../../registry'
import { userIdSchema } from '../../../../schemas/users/userSchema'

registry.registerPath({
  method: 'delete',
  tags: ['dashboard'],
  path: `${pathRoot.v1.dashboard.users}/{id}`,
  description: 'Soft deletes a user',
  summary: 'Delete a user',
  request: {
    params: z.object({ id: userIdSchema}),
  },
  security: [{ [cookieAuth.name]: [] }],
  responses: {
    204: {
      description: 'User has been soft deleted',
    },
    401: invalidTokenResponse,
    404: userNotFoundResponse,
    410: deletedUsersResponse,
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
