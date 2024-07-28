import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
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
  path: `${pathRoot.v1.resources}/me/{categorySlug}`,
  operationId: 'listUserMeResources',
  summary: 'Get resources by logged in user',
  description:
    'Returns all the posted resources by a logged in user. In addition, if categorySlug query provided, returns only the resources posted in that category.',
  request: {
    params: z.object({
      categorySlug: categorySlug.optional().openapi({ example: 'react' }),
    }),
  },
  parameters: [
    {
      name: 'categorySlug',
      in: 'path',
      required: false,
      description: 'Slug of the category for which to retrieve me resources',
      example: 'react',
    },
  ],
  security: [{ [cookieAuth.name]: [] }],
  responses: {
    200: {
      description: 'All resources posted by user are returned.',
      content: {
        'application/json': {
          schema: z.object({
            resources: z.array(resourceGetSchema),
          }),
        },
      },
    },
    401: invalidTokenResponse,
    404: userNotFoundResponse,
  },
})
