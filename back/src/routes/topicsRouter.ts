import Router from '@koa/router'
// import { z } from 'zod'
// import { /* authMiddleware, */ validate } from '../middleware'
import { getTopics } from '../controllers'
// import { TopicSchema } from '../schemas'

const topicsRouter = new Router()

topicsRouter.prefix('/api/v1/topics')

topicsRouter.get(
  '/',
  /* authMiddleware, */
  getTopics
)

export { topicsRouter }