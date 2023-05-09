import { pathRoot } from '../../../routes/routes'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['topics'],
  path: `${pathRoot.v1.topics}`,
  description: 'Returns a list of all topics',
  summary: 'Returns topics',
  responses: {
    200: {
      description: 'Topics retrieved succesfully,',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              slug: z.string(),
              categoryId: z.string(),
            }))
        },
      }
    },
  },
})
