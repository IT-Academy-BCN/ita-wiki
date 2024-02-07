import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import {
  getUsersIdNameResponse,
  zodValidationResponse,
} from '../../components/responses'
import { registry } from '../../registry'
import { usersGetNameByIdParamSchema } from '../../../schemas/users/usersGetNameByIdSchema'

registry.registerPath({
  method: 'get',
  tags: ['users'],
  path: `${pathRoot.v1.users}/name`,
  description: 'Returns id and name information of users.',
  summary: 'Get user name information',
  request: {
    query: usersGetNameByIdParamSchema,
  },
  responses: {
    200: getUsersIdNameResponse,
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
