import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import { userPatchSchema } from '../../../schemas/user/userPatchSchema'
import {
  invalidTokenResponse,
  missingTokenResponse,
  zodValidationResponse,
} from '../../components/responses'
import { registry } from '../../registry'

registry.registerPath({
  method: 'patch',
  tags: ['user'],
  path: `${pathRoot.v1.user}`,
  description: 'Allows a logged in ADMIN user to modify another user.',
  summary: 'Patch a user.',
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
    400: zodValidationResponse,
    401: missingTokenResponse,
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
