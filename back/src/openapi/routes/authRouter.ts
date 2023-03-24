import { registry } from '../registry'
import { UserSchema } from '../../schemas'
import { z } from '../zod'

// BUG: ESTO TENDRÍA QUE FUNCIONAR PERO EL OBJETO ESTÁ VACÍO EN SWAGGER-UI
const UserParam = registry.registerParameter(
  'User',
  UserSchema.omit({
    id: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  }).openapi({
    type: 'object',
    param: {
      name: 'user',
      in: 'query',
    },
  })
)

registry.registerPath({
  method: 'post',
  path: '/v1/auth/register',
  description:
    'Registers a new user and returns an auth JWT as a cookie session',
  summary: 'Register a user',
  request: {
    query: UserParam,
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
