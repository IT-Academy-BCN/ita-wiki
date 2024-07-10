import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import {
  listUsersIdNameResponse,
  zodValidationResponse,
} from '../../components/responses'
import { registry } from '../../registry'
import { usersListSchema } from '../../../schemas/users/usersListSchema'

registry.registerPath({
  method: 'get',
  tags: ['users'],
  path: `${pathRoot.v1.users}`,
  operationId: 'listUsers',
  description: 'Returns id and name information of users.',
  summary: 'Get list of users name information with given id array',
  request: {
    query: usersListSchema,
  },
  responses: {
    200: listUsersIdNameResponse,
    400: zodValidationResponse,
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
