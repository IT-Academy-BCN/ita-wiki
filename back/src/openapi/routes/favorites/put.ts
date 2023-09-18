import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../../components/responses/authMiddleware'
import { deniedAccessResponse } from '../../components/responses/authorize'
import { favoritePutSchema } from '../../../schemas/favorites/favoritePutSchema'

registry.registerPath({
  method: 'put',
  tags: ['favorites'],
  path: `${pathRoot.v1.favorites}`,
  description: 'Allows a logged in users to add/remove favorite resources.',
  summary: 'Put or delete a favorite resource by userId.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: favoritePutSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Put has been added/removed',
    },
    401: missingTokenResponse,
    403: deniedAccessResponse,
    404: {
      description: 'Not found',
    },
    405: invalidTokenResponse,
    409: {
      description: 'Conflict, data already exists.',
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
    },
  },
})
