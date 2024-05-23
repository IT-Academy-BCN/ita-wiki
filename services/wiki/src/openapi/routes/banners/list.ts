import { pathRoot } from '../../../routes/routes'
import { registry } from '../../registry'
import { z } from '../../zod'

registry.registerPath({
  method: 'get',
  tags: ['banners'],
  path: `${pathRoot.v1.banners}`,
  description: 'Get all banners saved in the database',
  summary: 'Get all banners',
  responses: {
    200: {
      description: 'Banners fetched',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              title: z.string().openapi({ example: 'ITAcademy' }),
              description: z.string().openapi({
                example:
                  'Aprende a programar en 18 semanas y reprograma tu futuro',
              }),
              url: z.string().openapi({
                example: 'https://www.barcelonactiva.cat/es/itacademy',
              }),
            })
          ),
        },
      },
    },
  },
})
