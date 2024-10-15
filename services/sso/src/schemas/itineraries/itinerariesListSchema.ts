import { z } from '../../openapi/zod'
import { itinerarySchema } from './itinerarySchema'

export const itinerariesListSchema = z.array(itinerarySchema)

export type TItinerayList = z.infer<typeof itinerarySchema>

export type TItineraryListId = Pick<TItinerayList, 'id'>
