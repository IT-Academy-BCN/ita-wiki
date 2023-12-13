import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import {
  invalidCredentialsResponse,
  validTokenResponse,
  zodValidationResponse,
} from '../../components/responses'
import { registry } from '../../registry'
import { validateSchema } from '../../../schemas/token/validateSchema'

registry.registerPath({
  method: 'post',
  tags: ['token'],
  path: `${pathRoot.v1.tokens}/validate`,
  description: 'Validates a given authentication token.',
  summary: 'Validate a Token',
  request: {
    body: {
      content: {
        'application/json': {
          schema: validateSchema,
        },
      },
    },
  },
  responses: {
    200: validTokenResponse,
    400: zodValidationResponse,
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
