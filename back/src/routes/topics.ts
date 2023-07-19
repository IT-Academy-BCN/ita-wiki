import Router from '@koa/router'
import { z } from 'zod'
import { USER_ROLE } from '@prisma/client'
import { createTopic, getTopics, patchTopic } from '../controllers'
import { pathRoot } from './routes'
import { authenticate, authorize, validate } from '../middleware'
import { topicCreateSchema, topicPatchSchema } from '../schemas'

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

topicsRouter.post(
  '/',
  authenticate,
  authorize(USER_ROLE.MENTOR),
  validate(z.object({ body: topicCreateSchema })),
  createTopic
)

topicsRouter.patch(
  '/',
  authenticate,
  authorize(USER_ROLE.MENTOR),
  validate(z.object({ body: topicPatchSchema })),
  patchTopic
)

export { topicsRouter }
