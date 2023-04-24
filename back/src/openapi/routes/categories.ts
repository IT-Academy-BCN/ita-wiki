import { pathRoot } from '../../routes/routes'
import { registry } from '../registry'
import { z } from '../zod'

registry.registerPath({
  method: 'get',
  tags: ['categories'],
  path: `${pathRoot.v1.categories}`,
  description:
    'Get all categories saved in the database',
  summary: 'Get all categories',
  responses: {
    200: {
      description: 'Categories fetched',
      content: {
        'application/json': {
            schema: z.array(
                z.object({
                    id: z.string(),
                    name: z.string().openapi({ example: 'Javascript'})
                })
            )
        }
      }
    },
  },
})
