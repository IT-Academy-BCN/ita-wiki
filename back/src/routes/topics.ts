import Router from '@koa/router'
import { z } from 'zod'
import { USER_ROLE } from '@prisma/client'
import { createTopic, getTopics, patchTopic } from '../controllers'
import { pathRoot } from './routes'
import { authMiddleware, validate } from '../middleware'
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
  authMiddleware(USER_ROLE.MENTOR),
  validate(z.object({ body: topicCreateSchema })),
  createTopic
)

topicsRouter.patch(
  '/',
  authMiddleware(USER_ROLE.MENTOR),
  validate(z.object({ body: topicPatchSchema })),
  patchTopic
)

export { topicsRouter }
