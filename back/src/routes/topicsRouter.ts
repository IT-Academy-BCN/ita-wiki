import Router from '@koa/router'
import { z } from 'zod'
import { getTopics } from '../controllers'
import { pathRoot } from './routes'
import { validate } from '../middleware'

const topicsRouter = new Router()

topicsRouter.prefix(pathRoot.v1.topics)

topicsRouter.get(
  '/',
  validate(
    z.object({
      query: z
        .object({
          categoryId: z.string().cuid().optional(),
          slug: z.string().optional(),
        })
        .optional(),
    })
  ),
  getTopics
)

export { topicsRouter }
