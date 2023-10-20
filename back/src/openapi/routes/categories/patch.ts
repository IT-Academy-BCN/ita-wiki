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
  path: `${pathRoot.v1.categories}/id/{id}`,
  summary: 'Patch a category by its ID.',
  description:
    'Modifies an existing category. The requestor has to be logged in and with role ADMIN.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    params: z.object({
      categoryId: z.string().openapi({
        param: {
          name: 'categoryId',
          description: 'ID of the category to modify',
          example: 'clnwzimjp0000h88ktz1ibtq5',
        },
      }),
    }),
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
