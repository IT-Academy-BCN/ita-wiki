import { pathRoot } from '../../../routes/routes'
import { itineraryGetSchema } from '../../../schemas/itinerary/itineraryGetSchema'
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
          schema: itineraryGetSchema,
        },
      },
    },
  },
})
