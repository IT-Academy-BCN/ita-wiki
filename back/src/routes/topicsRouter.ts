import Router from '@koa/router'
import { getTopics , getTopicsByCategoryId} from '../controllers'

const topicsRouter = new Router()

topicsRouter.prefix('/api/v1/topics')

topicsRouter.get(
  '/',
  getTopics
)

topicsRouter.get(
  '/category/:categoryId',
  getTopicsByCategoryId
)

export { topicsRouter }