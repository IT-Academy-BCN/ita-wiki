import { pathRoot } from '../../../routes/routes'
import { itinerariesListSchema } from '../../../schemas/itineraries/itinerariesListSchema'
import { registry } from '../../registry'

registry.registerPath({
  method: 'get',
  tags: ['itineraries'],
  path: `${pathRoot.v1.itineraries}`,
  operationId: 'listItineraries',
  description: 'Fetches all available itineraries',
  summary: 'Get all itineraries',
  responses: {
    200: {
      description: 'List of all itineraries',
      content: {
        'application/json': {
          schema: itinerariesListSchema,
        },
      },
    },
  },
})
