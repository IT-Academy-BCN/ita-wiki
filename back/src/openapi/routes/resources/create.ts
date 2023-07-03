import { pathRoot } from '../../../routes/routes'
import { resourceCreateSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../../components/responses/authMiddleware'
import { registry } from '../../registry'

registry.registerPath({
  method: 'post',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}`,
  description: 'Allows a logged in user to post a resource.',
  summary: 'Post a resource',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: resourceCreateSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Resource has been posted',
    },
    401: missingTokenResponse,
    405: invalidTokenResponse,
  },
})
