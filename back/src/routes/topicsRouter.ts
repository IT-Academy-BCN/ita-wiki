import Router from '@koa/router'
import { getTopics, getTopicsByCategoryId } from '../controllers'
import { pathRoot } from './routes'

const topicsRouter = new Router()

topicsRouter.prefix(pathRoot.v1.topics)

topicsRouter.get('/', getTopics)

topicsRouter.get('/category/:categoryId', getTopicsByCategoryId)

export { topicsRouter }
