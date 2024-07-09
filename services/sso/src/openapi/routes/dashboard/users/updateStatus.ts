import z from 'zod'
import { pathRoot } from '../../../../routes/routes'
import {
  invalidCredentialsResponse,
  usersNotFoundResponse,
} from '../../../components/responses'
import { registry } from '../../../registry'
import { cookieAuth } from '../../../components/cookieAuth'
import { dashboardUsersUpdateStatusSchema } from '../../../../schemas/users/dashboardUsersUpdateStatusSchema'

registry.registerPath({
  method: 'post',
  tags: ['dashboard'],
  path: `${pathRoot.v1.dashboard.users}/status`,
  operationId: 'postDashboardStatus',
  description: 'Update a collection of users status',
  summary: 'Get list of users name information',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: dashboardUsersUpdateStatusSchema,
        },
      },
    },
  },
  responses: {
    204: { description: 'The user statuses have been updated successfully.' },
    401: invalidCredentialsResponse,
    404: usersNotFoundResponse,
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
