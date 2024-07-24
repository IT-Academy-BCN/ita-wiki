import { z } from '../../openapi/zod'
import { itinerarySchema } from './itinerarySchema'

export const itinerariesListSchema = z.array(itinerarySchema)

export type ItinerayList = z.infer<typeof itinerarySchema>
