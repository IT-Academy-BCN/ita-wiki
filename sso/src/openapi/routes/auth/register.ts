import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import { registerSchema } from '../../../schemas'
import { zodValidationResponse } from '../../components/responses'
import { registry } from '../../registry'

registry.registerPath({
  method: 'post',
  tags: ['auth'],
  path: `${pathRoot.v1.auth}/register`,
  description:
    'Takes a DNI, email and a password and registers a new user in the database. No object is returned.',
  summary: 'Register a user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: registerSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'The user has been registered.',
    },
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
