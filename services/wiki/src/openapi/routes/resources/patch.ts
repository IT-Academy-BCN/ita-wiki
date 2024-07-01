import { pathRoot } from '../../../routes/routes'
import { resourcePatchSchema } from '../../../schemas/resource/resourcePatchSchema'
import { cookieAuth } from '../../components/cookieAuth'
import { invalidTokenResponse } from '../../components/responses/authMiddleware'
import { registry } from '../../registry'

registry.registerPath({
  method: 'patch',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}`,
  operationId: 'patchResources',
  description: 'Allows a logged in user to modify his resources.',
  summary: 'Patch a resource',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: resourcePatchSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Resource has been modified',
    },
    401: invalidTokenResponse,
    404: {
      description: 'Not found',
    },
  },
})
