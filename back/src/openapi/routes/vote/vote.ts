import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../../components/responses/authMiddleware'
import { ValidationError } from '../../components/errorSchemas'
import { voteCountSchema } from '../../../schemas'

registry.registerPath({
  method: 'get',
  tags: ['vote'],
  path: `${pathRoot.v1.vote}/{resourceId}`,
  description:
    'Get the vote count for a resource, separeted in total votes, upvotes and downvotes',
  summary: 'Get the vote count for a resource.',
  request: {
    params: z.object({
      resourceId: z.string().cuid().openapi({
        description: 'ID of the resource to get the vote count',
      }),
    }),
  },
  responses: {
    200: {
      description: 'Successful operation. Votes are retrieved and summed.',
      content: {
        'application/json': {
          schema: z.object({
            voteCount: voteCountSchema,
          }),
        },
      },
    },
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
          schema: ValidationError,
        },
      },
    },
    401: missingTokenResponse,
    405: invalidTokenResponse,
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
