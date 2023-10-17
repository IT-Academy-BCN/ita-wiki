import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { topicPatchSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../../components/responses/authMiddleware'
import { registry } from '../../registry'
import { deniedAccessResponse } from '../../components/responses/authorize'

registry.registerPath({
  method: 'patch',
  tags: ['topics'],
  path: `${pathRoot.v1.topics}`,
  description:
    'Modifies an existing topic. The requestor has to be logged in and with role MENTOR or higher.',
  summary: 'Patch a topic.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: topicPatchSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Topic successully modified.',
    },
    401: missingTokenResponse,
    403: deniedAccessResponse,
    404: {
      description: 'Topic not found',
    },
    498: invalidTokenResponse,
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
