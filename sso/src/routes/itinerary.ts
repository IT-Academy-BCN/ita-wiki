import Router from '@koa/router'
import { pathRoot } from './routes'
import { getItineraries } from '../controllers/itinerary/get'

export const itineraryRoutes = new Router()

itineraryRoutes.prefix(pathRoot.v1.itinerary)

itineraryRoutes.get('/', getItineraries)
