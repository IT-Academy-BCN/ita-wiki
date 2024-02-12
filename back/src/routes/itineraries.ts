import Router from '@koa/router'
import { listItineraries } from '../controllers'
import { pathRoot } from './routes'

const itinerariesRouter = new Router()

itinerariesRouter.prefix(pathRoot.v1.itinerary)

itinerariesRouter.get('/', listItineraries)

export { itinerariesRouter }
