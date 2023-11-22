import z from 'zod'
import { pathRoot } from '../../../routes/routes'
import {
  InvalidCredentialsResponse,
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
    204: {
      description: 'The token is valid',
    },
    400: zodValidationResponse,
    401: InvalidCredentialsResponse,
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
