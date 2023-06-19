import { pathRoot } from '../../routes/routes'
import { registry } from '../registry'
import { z } from '../zod'

registry.registerPath({
  method: 'get',
  tags: ['types'],
  path: `${pathRoot.v1.types}`,
  description: 'Returns an array of all the resource types',
  summary: 'Returns resource types',
  responses: {
    200: {
      description: 'types fetched',
      content: {
        'application/json': {
          schema: z.array(z.enum(['BLOG', 'VIDEO', 'TUTORIAL'])),
        },
      },
    },
  },
})
