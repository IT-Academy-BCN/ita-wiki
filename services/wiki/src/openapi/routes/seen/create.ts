import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import { resourceId } from '../../components/paramSchemas'
import { invalidTokenResponse } from '../../components/responses/authMiddleware'
import { registry } from '../../registry'

registry.registerPath({
  method: 'post',
  tags: ['seen'],
  path: `${pathRoot.v1.seen}/{resourceId}`,
  operationId: 'postUserSeenResourcesById',
  description: 'Allows a logged in user to mark a resource as viewed.',
  summary: 'Mark a resource as viewed',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    params: z.object({
      resourceId,
    }),
  },
  responses: {
    204: {
      description: 'Resource marked as viewed',
    },
    401: invalidTokenResponse,
  },
})
