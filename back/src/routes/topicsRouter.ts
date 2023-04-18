import Router from '@koa/router'
import { getTopics } from '../controllers'

const topicsRouter = new Router()

topicsRouter.prefix('/api/v1/topics')

topicsRouter.get(
  '/',
  getTopics
)

export { topicsRouter }