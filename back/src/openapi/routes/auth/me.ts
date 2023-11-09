import { userSchema } from '../../../schemas'
import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
  userNotFoundResponse,
} from '../../components/responses/authMiddleware'

// const authCookie = z.string().openapi({example: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhUmFuZG9tVXNlcklkIiwiaWF0IjoxNjgyNTAwNjczLCJleHAiOjE2ODI1ODcwNzN9.fvH3xbno7DQW3IPOekXz5D8H6TUpAq99UCK-_jY_qgI;'})

registry.registerPath({
  method: 'get',
  tags: ['auth'],
  path: `${pathRoot.v1.auth}/me`,
  description:
    'Returns information of a logged in user. Token recieved in the login necessary.',
  summary: 'Get user information',
  security: [{ [cookieAuth.name]: [] }],
  responses: {
    200: {
      description: 'Token is valid and user information is returned.',
      content: {
        'application/json': {
          schema: userSchema.pick({
            name: true,
            dni: true,
            email: true,
            role: true,
            status: true,
          }),
        },
      },
    },
    401: missingTokenResponse,
    404: userNotFoundResponse,
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
