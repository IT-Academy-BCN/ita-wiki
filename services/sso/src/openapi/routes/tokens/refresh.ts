import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import {
  invalidCredentialsResponse,
  refreshTokenResponse,
} from '../../components/responses'
import { registry } from '../../registry'
import { bearerAuth } from '../../components/bearerAuth'

registry.registerPath({
  method: 'post',
  tags: ['tokens'],
  path: `${pathRoot.v1.tokens}/refresh`,
  operationId: 'postRefreshTokens',
  description:
    'Allows clients to obtain a new access token using a valid refresh token. Ensure to send the refresh token as a Bearer token in the Authorization header. This method extends user sessions securely without re-entering login credentials.',
  summary: 'Renew Access Token',
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: refreshTokenResponse,
    401: invalidCredentialsResponse,
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
