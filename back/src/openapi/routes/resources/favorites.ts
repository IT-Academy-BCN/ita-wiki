import { pathRoot } from '../../../routes/routes'
import { registry } from '../../registry'
import { resourceSchema } from '../../../schemas'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/favorites/:categorySlug?`,
  description: 'Retrieves the users favorite resources when logged in',
  summary: 'Returns favorite resources by user',
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
      description: 'Favorite resources retireved  successfully.',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              resource: resourceSchema,
            })
          ),
        },
      },
    },
    400: {
      description: 'User ID is required',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'UserId is required' }),
          }),
        },
      },
    },
    401: {
      description: 'Missing token',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Missing token' }),
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
  },
})
