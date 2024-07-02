import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { topicPatchSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import { invalidTokenResponse } from '../../components/responses/authMiddleware'
import { deniedAccessResponse } from '../../components/responses/authorize'
import { registry } from '../../registry'

registry.registerPath({
  method: 'patch',
  tags: ['topics'],
  path: `${pathRoot.v1.topics}`,
  operationId: 'patchTopics',
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
      description: 'Topic successfully modified.',
    },
    401: invalidTokenResponse,
    403: deniedAccessResponse,
    404: {
      description: 'Topic not found',
    },
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
