import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { categoryPatchSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../../components/responses/authMiddleware'
import { deniedAccessResponse } from '../../components/responses/authorize'
import { registry } from '../../registry'

registry.registerPath({
  method: 'patch',
  tags: ['categories'],
  path: `${pathRoot.v1.categories}`,
  description:
    'Modifies an existing category. The requestor has to be logged in and with role ADMIN.',
  summary: 'Patch a category.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: categoryPatchSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Category modified succesfully.',
    },
    401: missingTokenResponse,
    403: deniedAccessResponse,
    404: {
      description: 'Category not found',
    },
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
