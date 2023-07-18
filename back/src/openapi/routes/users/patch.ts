import { userPatchSchema } from '../../../schemas'
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
  method: 'patch',
  tags: ['users'],
  path: `${pathRoot.v1.users}`,
  description: 'Allows an ADMIN user to modify other user data.',
  summary: 'Patch user.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: userPatchSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'User has been modified.',
    },
    401: missingTokenResponse,
    403: deniedAccessResponse,
    404: {
      description: 'Not found.',
    },
    405: invalidTokenResponse,
    500: {
      description: 'Other error.',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Database error.' }),
          }),
        },
      },
    },
  },
})
