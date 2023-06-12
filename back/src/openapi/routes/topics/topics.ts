import { pathRoot } from '../../../routes/routes'
import { topicSchema } from '../../../schemas'
import { NotFoundError } from '../../components/errorSchemas'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['topics'],
  path: `${pathRoot.v1.topics}`,
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
          schema: z.object({
            topics: z.array(
              topicSchema.omit({
                createdAt: true,
                updatedAt: true,
              })
            ),
          }),
        },
      },
    },
    404: {
      description: 'Category was not found',
      content: {
        'application/json': {
          schema: NotFoundError.openapi({
            examples: [
              { message: 'No category found with this id' },
              { message: 'No category found with this slug' },
            ],
          }),
        },
      },
    },
  },
})
