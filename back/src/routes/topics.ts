import Router from '@koa/router'
import { z } from 'zod'
import { createTopic, getTopics, patchTopic } from '../controllers'
import { pathRoot } from './routes'
import { authenticate, authorize, validate } from '../middleware'
import { topicCreateSchema, topicPatchSchema } from '../schemas'
import { UserRole } from '../schemas/users/userSchema'

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
  authorize(UserRole.MENTOR),
  validate(z.object({ body: topicCreateSchema })),
  createTopic
)

topicsRouter.patch(
  '/',
  authenticate,
  authorize(UserRole.MENTOR),
  validate(z.object({ body: topicPatchSchema })),
  patchTopic
)

export { topicsRouter }
