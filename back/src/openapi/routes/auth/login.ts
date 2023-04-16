import { UserLoginSchema } from '../../../schemas'
import { registry } from '../../registry'
import { z } from '../../zod'
import { ValidationError } from '../../components/errorSchemas'


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
      headers: {
        'Set-Cookie': {
          // I CANNOT USE A ZOD OBJECT
          // --------------------------
          // z.string().openapi({
          //   example:
          //     'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGdieTNyemYwMDAweG44eDdzeXJvMnc2IiwiaWF0IjoxNjgxMjEyNzAzLCJleHAiOjE2ODEyOTkxMDN9.G1F5XQLYu0uwxnJDx_qDUV3avIUPxHb3Ld-XZYvUfNM; path=/; httponly',
          //   description: 'JWT session cookie',
          // })
        },
      },
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
