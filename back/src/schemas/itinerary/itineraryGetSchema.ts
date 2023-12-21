import { z } from '../../openapi/zod'
import { itinerarySchema } from './itinerarySchema'

export const itineraryGetSchema = z.array(itinerarySchema)
