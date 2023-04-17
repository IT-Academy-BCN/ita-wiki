import { UserLoginSchema } from '../../../schemas'
import { registry } from '../../registry'
import { z } from '../../zod'
import { ValidationError } from '../../components/errorSchemas'
import { setCookieHeader } from '../../components/setCookieHeader'


const pathRoot = '/api/v1/auth'
registry.registerPath({
  method: 'post',
  tags: ['auth'],
  path: `${pathRoot}/login`,
  description: 'Takes a DNI and a password and returns a session cookie',
  summary: 'Logs in a user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UserLoginSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'The user has been authenticated',
      headers: { 'Set-Cookie': setCookieHeader.ref }
    },
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
    422: {
      description: 'Invalid password',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Invalid password' }),
          }),
        },
      },
    },
    400: {
      description: 'Zod validation error',
      content: {
        'application/json': {
          schema: z.object({
            message: ValidationError,
          }),
        },
      },
    },
  },
})
