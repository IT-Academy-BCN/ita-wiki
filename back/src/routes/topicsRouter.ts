import Router from '@koa/router'
import { getTopics , getTopicsByCategoryId} from '../controllers'
import { pathRoot } from './routes'
import { getTopicsByResourceId } from '../controllers/topicController'

const topicsRouter = new Router()

topicsRouter.prefix(pathRoot.v1.topics)

topicsRouter.get(
  '/',
  getTopics
)

topicsRouter.get(
  '/category/:categoryId',
  getTopicsByCategoryId
)

topicsRouter.get(
  '/resource/:resourceId',
  getTopicsByResourceId
)

export { topicsRouter }