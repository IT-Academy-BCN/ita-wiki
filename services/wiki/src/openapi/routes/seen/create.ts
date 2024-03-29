import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../../components/responses/authMiddleware'
import { registry } from '../../registry'
import { resourceId } from '../../components/paramSchemas'

registry.registerPath({
  method: 'post',
  tags: ['seen'],
  path: `${pathRoot.v1.seen}/{resourceId}`,
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
    401: missingTokenResponse,
    498: invalidTokenResponse,
  },
})
