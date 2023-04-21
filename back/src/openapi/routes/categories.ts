import { registry } from '../registry'
import { z } from '../zod'


const pathRoot = '/api/v1/categories'

registry.registerPath({
  method: 'get',
  tags: ['categories'],
  path: `${pathRoot}/`,
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
