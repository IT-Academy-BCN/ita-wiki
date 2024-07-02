import { pathRoot } from '../../../routes/routes'
import { itinerariesListSchema } from '../../../schemas/itinerary/itinerariesListSchema'
import { serviceUnavailableResponse } from '../../components/responses/itinerary'
import { registry } from '../../registry'

registry.registerPath({
  method: 'get',
  tags: ['itinerary'],
  path: `${pathRoot.v1.itinerary}`,
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
    503: serviceUnavailableResponse,
  },
})
