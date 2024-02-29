import { userSchema } from '../../../schemas'
import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../../components/responses/authMiddleware'
import { deniedAccessResponse } from '../../components/responses/authorize'

registry.registerPath({
  method: 'get',
  tags: ['users'],
  path: `${pathRoot.v1.users}`,
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
    401: missingTokenResponse,
    403: deniedAccessResponse,
    498: invalidTokenResponse,
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
