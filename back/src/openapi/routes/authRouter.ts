import { UserSchema } from '../../schemas'
import { registry } from '../registry'
import { z } from '../zod'

registry.registerPath({
  method: 'post',
  path: '/v1/auth/register',
  description:
    'Registers a new user and returns an auth JWT as a cookie session',
  summary: 'Register a user',
  request: {
    query: UserSchema,
    body: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'The user has been authenticated',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'OK' }),
          }),
        },
      },
    },
    400: {
      description: 'DNI already exists',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'DNI already exists' }),
          }),
        },
      },
    },
  },
})
