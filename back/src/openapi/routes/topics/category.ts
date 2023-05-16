import { pathRoot } from '../../../routes/routes'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['topics'],
  path: `${pathRoot.v1.topics}/category/:categoryId`,
  description:
    'Takes a category Id and returns the list of topics sharing that category',
  summary: 'Returns topics by category',
  parameters: [
    {
      name: 'categoryId',
      in: 'path',
      required: true,
      description: 'ID of the category for which to retrieve topics',
    },
  ],
  responses: {
    200: {
      description: 'Topics by category id retrieved  successfully.',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              slug: z.string(),
            })
          ),
        },
      },
    },
  },
})
