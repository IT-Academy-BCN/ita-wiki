import { pathRoot } from '../../../routes/routes'
import { loginSchema } from '../../../schemas/auth/loginSchema'
import { tokenSchema } from '../../../schemas/tokens/tokenSchema'
import {
  forbiddenResponse,
  invalidCredentialsResponse,
  zodValidationResponse,
} from '../../components/responses'
import { registry } from '../../registry'

registry.registerPath({
  method: 'post',
  tags: ['auth'],
  path: `${pathRoot.v1.auth}/login`,
  description:
    'Takes a DNI and a password and returns authToken and refreshToken',
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
          schema: tokenSchema,
        },
      },
    },
    400: zodValidationResponse,
    403: forbiddenResponse,
    401: invalidCredentialsResponse,
  },
})
