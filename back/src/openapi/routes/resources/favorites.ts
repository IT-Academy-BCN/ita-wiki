import { pathRoot } from '../../../routes/routes'
import { registry } from '../../registry'
import { resourceFavoriteSchema } from '../../../schemas'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/favorites`,
  description: 'Retrieves the users favorite resources when logged in',
  summary: 'Returns favorite resources by user and category',
  parameters: [
    {
      name: 'categorySlug',
      in: 'path',
      required: false,
      description:
        'Slug of the category for which to retrieve favorite resources',
      example: 'node',
    },
  ],
  responses: {
    200: {
      description: 'Favorite resources retrieved successfully.',
      content: {
        'application/json': {
          schema: z.array(resourceFavoriteSchema),
        },
      },
    },
    401: {
      description: 'Missing token',
      content: {
        'application/json': {
          schema: z.object({
            error: z
              .string()
              .openapi({ example: 'Unauthorized: Missing token' }),
          }),
        },
      },
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'User not found' }),
          }),
        },
      },
    },
    498: {
      description: 'Invalid token',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Token is not valid' }),
          }),
        },
      },
    },
  },
})
