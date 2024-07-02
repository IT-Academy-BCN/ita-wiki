import { pathRoot } from '../../../routes/routes'
import { userPatchSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  upstreamServiceFailResponse,
  zodValidationErrorResponse,
} from '../../components/responses/authMiddleware'
import { deniedAccessResponse } from '../../components/responses/authorize'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'patch',
  tags: ['users'],
  path: `${pathRoot.v1.users}`,
  operationId: 'patchUsersById',
  description: 'Allows a logged in ADMIN user to modify another user.',
  summary: 'Patch a user.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      required: true,
      description:
        'Updates an existing user. The ID is mandatory, and all other fields are optional. Provide only the fields that need to be updated.',

      content: {
        'application/json': {
          schema: userPatchSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'User has been modified',
    },
    400: zodValidationErrorResponse,
    401: invalidTokenResponse,
    403: deniedAccessResponse,
    404: {
      description: 'Not found',
    },
    409: {
      description: 'Conflict, data already exists.',
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
    502: upstreamServiceFailResponse,
  },
})
