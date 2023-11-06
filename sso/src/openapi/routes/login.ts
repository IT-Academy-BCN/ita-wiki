import { pathRoot } from '../../routes/routes'
import {
  loginResponseSchema,
  loginSchema,
} from '../../schemas/auth/loginSchema'
import {
  invalidPasswordResponse,
  userNotFoundResponse,
  zodValidationResponse,
} from '../components/responses'
import { registry } from '../registry'

registry.registerPath({
  method: 'post',
  tags: ['auth'],
  path: `${pathRoot.v1.auth}/login`,
  description: 'Takes a DNI and a password and returns a session cookie',
  summary: 'Logs in a user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: loginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'The user has been authenticated',
      content: {
        'application/json': {
          schema: loginResponseSchema,
        },
      },
    },
    400: zodValidationResponse,
    404: userNotFoundResponse,
    422: invalidPasswordResponse,
  },
})
