import { UserLoginSchema, UserRegisterSchema } from '../../schemas'
import { registry } from '../registry'
import { z } from '../zod'

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
      // TODO: no encuentro como configurar la respuesta del header correctamente
      // headers: z.object({
      //   'Set-Cookie': z.string().openapi({
      //     example:
      //       'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGdieTNyemYwMDAweG44eDdzeXJvMnc2IiwiaWF0IjoxNjgxMjEyNzAzLCJleHAiOjE2ODEyOTkxMDN9.G1F5XQLYu0uwxnJDx_qDUV3avIUPxHb3Ld-XZYvUfNM; path=/; httponly',
      //     description: 'JWT session cookie',
      //   }),
      // }),
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
            message: z.array(z.object({})).openapi({
              example: [
                {
                  validation: 'regex',
                  code: 'invalid_string',
                  message: 'Invalid',
                  path: ['body', 'dni'],
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'undefined',
                  path: ['body', 'password'],
                  message: 'Required',
                },
              ],
            }),
          }),
        },
      },
    },
  },
})

registry.registerPath({
  method: 'post',
  tags: ['auth'],
  path: `${pathRoot}/register`,
  description:
    'Takes a DNI, a password, a name and an email an registers a user to the system',
  summary: 'Registers a new user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UserRegisterSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'The user has been registered',
    },
    400: {
      description: 'Invalid input',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              z.object({
                message: z.string().openapi({ example: 'DNI already exists' }),
              },
              z.object({
                message: z.string().openapi({ example: 'Email already exists' })
              }),
              z.object({
                message: z.array(z.object({})).openapi({
                  example: [
                    {
                      validation: 'regex',
                      code: 'invalid_string',
                      message: 'Invalid',
                      path: ['body', 'dni'],
                    },
                    {
                      code: 'invalid_type',
                      expected: 'string',
                      received: 'undefined',
                      path: ['body', 'password'],
                      message: 'Required',
                    },
                  ],
                }),
              }),
            ]
          },
        },
      },
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
    }
  },
})
