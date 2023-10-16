import { pathRoot } from '../../../routes/routes'
import { registry } from '../../registry'
import { resourceFavoriteSchema } from '../../../schemas'
import { z } from '../../zod'
import {
  invalidTokenResponse,
  missingTokenResponse,
  userNotFoundResponse,
} from '../../components/responses/authMiddleware'

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
    401: missingTokenResponse,
    404: userNotFoundResponse,
    498: invalidTokenResponse,
  },
})
