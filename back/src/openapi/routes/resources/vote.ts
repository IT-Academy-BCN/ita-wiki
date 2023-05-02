import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import { invalidTokenResponse, missingTokenResponse } from '../../components/responses/authMiddleware'

registry.registerPath({
  method: 'put',
  tags: ['resources', 'vote'],
  path: `${pathRoot.v1.resources}/vote/:resourceId/:vote`,
  description: 'Allows a user to vote for a resource. Vote can be 1 for an upvote, -1 for a downvote or 0 to cancel a previous vote.',
  summary: 'Allows a user to vote for a resource.',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    params: z.object({
        resourceId: z.string().cuid().openapi({
            description: "ID of the resource to vote",
            
        }),
        vote: z.number().int().max(1).min(-1).openapi({
            description: "1 for upvote, -1 for downvote, 0 to cancel previous vote."
        })
    })
  },
  responses: {
    204: {
      description: 'Vote was sent and stored successfully.'
    },
    401: missingTokenResponse,
    405: invalidTokenResponse,
    404: {
      description: 'User not found',
      content: {
        'application/json': {
            schema: z.object({
                error: z.string().openapi({ example: 'User not found' }),
            }),
        },
      },
    },
  },
})
