import { registry } from '../registry'
import { bearerAuth } from '../components/berarerAuth'
import { z } from '../zod'

/*
 * Full example of a JWT protected route that uses Zod schemas to declare request params and response body objects
 */

const UserIdSchema = registry.registerParameter(
  'UserId',
  z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    example: '1212121',
  })
)
const UserSchema = registry.register(
  'DemoRouteUser',
  z.object({
    id: z.string(),
    name: z.string(),
    age: z.number().openapi({
      example: 42,
    }),
  })
)

registry.registerPath({
  method: 'get',
  path: '/demoRoute/users/{id}',
  description: 'Get user data by its id',
  summary: 'Get a single user',
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: UserIdSchema }),
  },
  responses: {
    200: {
      description: 'Object with user data.',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
    204: {
      description: 'No content - successful operation',
    },
  },
})
