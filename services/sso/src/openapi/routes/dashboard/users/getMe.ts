import z from 'zod'
import { registry } from '../../../registry'
import { pathRoot } from '../../../../routes/routes'
import { cookieAuth } from '../../../components/cookieAuth'
import {
  getDashboardUserResponse,
  invalidCredentialsResponse,
  userNotFoundResponse,
} from '../../../components/responses'

registry.registerPath({
  method: 'get',
  tags: ['dashboard'],
  path: `${pathRoot.v1.dashboard.users}/me`,
  description: 'Returns information of a logged in user.',
  summary: 'Get user information',
  security: [{ [cookieAuth.name]: [] }],
  responses: {
    200: getDashboardUserResponse,
    401: invalidCredentialsResponse,
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
