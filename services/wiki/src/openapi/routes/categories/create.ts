import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { categoryCreateSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import { invalidTokenResponse } from '../../components/responses/authMiddleware'
import { deniedAccessResponse } from '../../components/responses/authorize'
import { registry } from '../../registry'

registry.registerPath({
  method: 'post',
  tags: ['categories'],
  path: `${pathRoot.v1.categories}`,
  operationId: 'postCategories',
  description:
    'Creates a new category. The requestor has to be logged in and with role ADMIN.',
  summary: 'Creates a new category.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: categoryCreateSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'New category created succesfully.',
    },
    401: invalidTokenResponse,
    403: deniedAccessResponse,
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
