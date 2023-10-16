import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { topicCreateSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../../components/responses/authMiddleware'
import { deniedAccessResponse } from '../../components/responses/authorize'
import { registry } from '../../registry'

registry.registerPath({
  method: 'post',
  tags: ['topics'],
  path: `${pathRoot.v1.topics}`,
  description:
    'Creates a new topic. The requestor has to be logged in and with role MENTOR or higher.',
  summary: 'Creates a new topic.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: topicCreateSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'New topic created succesfully.',
    },
    401: missingTokenResponse,
    403: deniedAccessResponse,
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
