import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  userNotFoundResponse,
} from '../../components/responses/authMiddleware'
import { favoritePutSchema } from '../../../schemas/favorites/favoritePutSchema'
import { InputError, ZodValidationError } from '../../components/errorSchemas'

registry.registerPath({
  method: 'put',
  tags: ['favorites'],
  path: `${pathRoot.v1.favorites}`,
  operationId: 'putFavorites',
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
      description: 'Favorite has been added/removed',
    },
    400: {
      description: 'Invalid input',
      content: {
        'application/json': {
          schema: z.union([ZodValidationError, InputError]),
        },
      },
    },
    401: invalidTokenResponse,
    404: userNotFoundResponse,
  },
})
