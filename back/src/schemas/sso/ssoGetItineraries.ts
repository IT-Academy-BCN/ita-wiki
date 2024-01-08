import { z } from '../../openapi/zod'
import { itineraryGetSchema } from '../itinerary/itineraryGetSchema'

export type TSsoGetItinerariesResponse = z.infer<typeof itineraryGetSchema>
