import { pathRoot } from '../../../routes/routes'
import { itinerarySchema } from '../../../schemas/itinerary/itinerarySchema'
import { registry } from '../../registry'

registry.registerPath({
  method: 'get',
  tags: ['itinerary'],
  path: `${pathRoot.v1.itinerary}`,
  description: 'Fetches all available itineraries',
  summary: 'Get all itineraries',
  responses: {
    200: {
      description: 'List of all itineraries',
      content: {
        'application/json': {
          schema: itinerarySchema,
        },
      },
    },
  },
})
