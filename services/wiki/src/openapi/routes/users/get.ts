import { pathRoot } from '../../../routes/routes'
import { userSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import { invalidTokenResponse } from '../../components/responses/authMiddleware'
import { deniedAccessResponse } from '../../components/responses/authorize'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['users'],
  path: `${pathRoot.v1.users}`,
  operationId: 'listUsers',
  description:
    'Returns information of all users. User must be ADMIN and logged in.',
  summary: 'Get all users',
  security: [{ [cookieAuth.name]: [] }],
  responses: {
    200: {
      description: 'Token is valid and info of all users is returned.',
      content: {
        'application/json': {
          schema: z.array(
            userSchema.omit({
              password: true,
            })
          ),
        },
      },
    },
    401: invalidTokenResponse,
    403: deniedAccessResponse,
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
