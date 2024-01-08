import Router from '@koa/router'
import { getItineraries } from '../controllers'
import { pathRoot } from './routes'

const itineraryRouter = new Router()

itineraryRouter.prefix(pathRoot.v1.itinerary)

itineraryRouter.get('/', getItineraries)

export { itineraryRouter }
