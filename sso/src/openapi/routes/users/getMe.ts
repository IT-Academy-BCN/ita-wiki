import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import {
  getUserResponse,
  invalidCredentialsResponse,
  zodValidationResponse,
} from '../../components/responses'
import { registry } from '../../registry'
import { validateSchema } from '../../../schemas/tokens/validateSchema'

registry.registerPath({
  method: 'post',
  tags: ['users'],
  path: `${pathRoot.v1.users}/me`,
  description:
    'Returns information of a logged in user. Token received in the login necessary.',
  summary: 'Get user information',
  request: {
    body: {
      content: {
        'application/json': {
          schema: validateSchema,
        },
      },
    },
  },
  responses: {
    200: getUserResponse,
    400: zodValidationResponse,
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
