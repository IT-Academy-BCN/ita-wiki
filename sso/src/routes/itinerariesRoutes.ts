import Router from '@koa/router'
import { pathRoot } from './routes'
import { listItineraries } from '../controllers/itineraries/list'

export const itinerariesRoutes = new Router()

itinerariesRoutes.prefix(pathRoot.v1.itineraries)

itinerariesRoutes.get('/', listItineraries)
