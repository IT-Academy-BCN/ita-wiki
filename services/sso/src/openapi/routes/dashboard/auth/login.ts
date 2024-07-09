import { pathRoot } from '../../../../routes/routes'
import { loginSchema } from '../../../../schemas'
import {
  zodValidationResponse,
  forbiddenResponse,
  invalidCredentialsResponse,
} from '../../../components/responses'
import { setCookieHeader } from '../../../components/setCookieHeader'
import { registry } from '../../../registry'

registry.registerPath({
  method: 'post',
  tags: ['dashboard'],
  path: `${pathRoot.v1.dashboard.auth}/login`,
  operationId: 'postDashboardLogin',
  description:
    'Takes a DNI and a password and returns authToken and refreshToken cookie',
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
    204: {
      description: 'The user has been authenticated',
      headers: { 'Set-Cookie': setCookieHeader.ref },
    },
    400: zodValidationResponse,
    403: forbiddenResponse,
    401: invalidCredentialsResponse,
  },
})
