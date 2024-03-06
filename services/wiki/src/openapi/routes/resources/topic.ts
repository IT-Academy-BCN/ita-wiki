import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema } from '../../../schemas'
import { NotFoundError } from '../../components/errorSchemas'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/topic/{topicId}`,
  summary: 'Returns a list of resources by topic ID',
  description:
    'Takes in a valid topic ID and returns a list of resources by topic',
  request: {
    params: z.object({
      topicId: z.string().trim().min(1).openapi({
        description: 'ID of topic for which to retrieve resources',
      }),
    }),
  },
  responses: {
    200: {
      description: 'Resources found',
    },
    404: {
      description: 'Topic not found',
    },
  },
})

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/topic/slug/{slug}`,
  summary: 'Returns a list of resources by topic slug',
  description:
    'Takes in a valid topic slug and returns a list of resources associated with that topic slug',
  request: {
    params: z.object({
      slug: z.string().trim().min(1).openapi({
        description: 'topic slug associated with the resources',
      }),
    }),
  },
  responses: {
    200: {
      description: 'Resources found',
      content: {
        'application/json': {
          schema: resourceGetSchema,
        },
      },
    },
    404: {
      description: 'Topic not found',
      content: {
        'application/json': {
          schema: NotFoundError.openapi({
            example: { message: 'Topic not found' },
          }),
        },
      },
    },
  },
})
