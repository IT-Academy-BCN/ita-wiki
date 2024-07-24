import { pathRoot } from '../../../routes/routes'
import { resourceFavoriteSchema } from '../../../schemas'
import { categorySlug } from '../../components/paramSchemas'
import {
  invalidTokenResponse,
  userNotFoundResponse,
} from '../../components/responses/authMiddleware'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/favorites/{categorySlug}`,
  operationId: 'listFavoritesResources',
  description: 'Retrieves the users favorite resources when logged in',
  summary: 'Returns favorite resources by user and category',
  request: {
    params: z.object({
      categorySlug,
    }),
  },
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
    401: invalidTokenResponse,
    404: userNotFoundResponse,
  },
})
