import z from 'zod'
import { pathRoot } from '../../../../routes/routes'
import {
  invalidCredentialsResponse,
  userUpdatedResponse,
} from '../../../components/responses'
import { registry } from '../../../registry'
import { cookieAuth } from '../../../components/cookieAuth'

registry.registerPath({
  method: 'patch',
  tags: ['dashboard'],
  path: `${pathRoot.v1.dashboard.users}/{userId}`,
  description: 'Updates specific fields of a user.',
  summary: 'Update user information',
  security: [{ [cookieAuth.name]: [] }],

  responses: {
    200: userUpdatedResponse,
    400: {
      description: 'Invalid request',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: 'No valid fields provided for update' }),
          }),
        },
      },
    },
    401: invalidCredentialsResponse,
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'User not found' }),
          }),
        },
      },
    },
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
