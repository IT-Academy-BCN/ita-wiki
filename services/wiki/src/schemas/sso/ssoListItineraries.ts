import { z } from '../../openapi/zod'
import { itinerariesListSchema } from '../itinerary/itinerariesListSchema'

export type TSsoListItinerariesResponse = z.infer<typeof itinerariesListSchema>
