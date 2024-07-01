import { pathRoot } from '../../../routes/routes'
import { topicSchema } from '../../../schemas'
import { categoryNotFoundResponse } from '../../components/responses/category'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['topics'],
  path: `${pathRoot.v1.topics}`,
  operationId: 'listTopics',
  description:
    'Returns a list of all topics. Filter by category id or category slug possible. If both filters are sent, will only search by category id.',
  summary: 'Returns topics. Filter by category possible.',
  request: {
    query: z.object({
      categoryId: z.string().cuid().optional(),
      slug: z.string().optional().openapi({ example: 'javascript' }),
    }),
  },
  responses: {
    200: {
      description: 'Topics retrieved succesfully,',
      content: {
        'application/json': {
          schema: z.array(
            topicSchema.omit({
              createdAt: true,
              updatedAt: true,
            })
          ),
        },
      },
    },
    404: categoryNotFoundResponse,
  },
})
