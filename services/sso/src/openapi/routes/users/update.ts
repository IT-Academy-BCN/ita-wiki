import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import { userIdSchema } from '../../../schemas/users/userSchema'
import { userUpdateSchema } from '../../../schemas/users/userUpdateSchema'
import {
  invalidTokenResponse,
  userNotFoundResponse,
  zodValidationResponse,
} from '../../components/responses'
import { registry } from '../../registry'

registry.registerPath({
  method: 'patch',
  tags: ['users'],
  path: `${pathRoot.v1.users}/{id}`,
  operationId: 'patchUsers',
  description: 'Allows a logged in ADMIN user to modify another user.',
  summary: 'Patch a user.',
  request: {
    params: z.object({ id: userIdSchema }),
    body: {
      required: true,
      description:
        'Updates an existing user. The ID is mandatory, and all other fields are optional. Provide only the fields that need to be updated.',

      content: {
        'application/json': {
          schema: userUpdateSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'User has been modified',
    },
    400: zodValidationResponse,
    401: invalidTokenResponse,
    404: userNotFoundResponse,
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
