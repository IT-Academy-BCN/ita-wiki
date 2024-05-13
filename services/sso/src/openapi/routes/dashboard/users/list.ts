import z from 'zod'
import { pathRoot } from '../../../../routes/routes'
import {
  invalidCredentialsResponse,
  listDashboardUsersResponse,
} from '../../../components/responses'
import { registry } from '../../../registry'
import { cookieAuth } from '../../../components/cookieAuth'
import { dashboardUsersListQuerySchema } from '../../../../schemas'

registry.registerPath({
  method: 'get',
  tags: ['dashboard'],
  path: `${pathRoot.v1.dashboard.users}`,
  description:
    'Returns id, name, dni, itinerary, status, role, deletedAt and created at information of users.',
  summary: 'Get list of users name information',
  security: [{ [cookieAuth.name]: [] }],
  request: { query: dashboardUsersListQuerySchema },
  responses: {
    200: listDashboardUsersResponse,
    401: invalidCredentialsResponse,
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
