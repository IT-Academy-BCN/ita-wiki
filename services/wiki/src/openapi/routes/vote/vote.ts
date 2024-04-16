import { pathRoot } from '../../../routes/routes'
import { voteCountSchema } from '../../../schemas'
import { cookieAuth } from '../../components/cookieAuth'
import { ZodValidationError } from '../../components/errorSchemas'
import { resourceId } from '../../components/paramSchemas'
import { invalidTokenResponse } from '../../components/responses/authMiddleware'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['vote'],
  path: `${pathRoot.v1.vote}/{resourceId}`,
  description:
    'Retrieve a detailed vote count for a specified resource, including the number of upvotes, downvotes, and the overall vote balance.',
  summary: 'Fetch detailed vote statistics for a resource.',
  request: {
    params: z.object({
      resourceId,
    }),
  },
  responses: {
    200: {
      description:
        'Successfully retrieved detailed vote statistics for the specified resource.',
      content: {
        'application/json': {
          schema: voteCountSchema,
        },
      },
    },
    401: invalidTokenResponse,
    404: {
      description: 'Resource not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Resource not found' }),
          }),
        },
      },
    },
  },
})

registry.registerPath({
  method: 'put',
  tags: ['vote'],
  path: `${pathRoot.v1.vote}`,
  description:
    'Allows a user to vote for a resource. Vote can be "up", "down"  or "cancel" to cancel a previous vote.',
  summary: 'Allows a user to vote for a resource.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            resourceId: z.string().cuid().openapi({
              description: 'ID of the resource to vote',
            }),
            vote: z.enum(['up', 'down', 'cancel']).openapi({
              description: 'Upvote, downvote or cancel a previous vote.',
            }),
          }),
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Vote was sent and stored successfully.',
    },
    400: {
      description:
        'Validation error. Either resourceId or vote are not correct',
      content: {
        'application/json': {
          schema: ZodValidationError,
        },
      },
    },
    401: invalidTokenResponse,
    404: {
      description: 'User or resource not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ examples: ['User not found', 'Resource not found'] }),
          }),
        },
      },
    },
  },
})
