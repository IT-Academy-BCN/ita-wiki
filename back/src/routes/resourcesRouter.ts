import Router from '@koa/router'
import { z } from 'zod'
import { authMiddleware, validate } from '../middleware'
import { createResource, getResourcesByUserId, getResourcesByTopicId, getResources, getResourceVote, putResourceVote } from '../controllers'
import { getResourcesByTopicSlug } from '../controllers/resources/getResourcesByTopicSlug'
import { resourceCreateSchema } from '../schemas'
import { pathRoot } from './routes'


const resourcesRouter = new Router()

resourcesRouter.prefix(pathRoot.v1.resources)

resourcesRouter.post(
  '/create',
  authMiddleware,
  validate(z.object({ body: resourceCreateSchema })),
  createResource
)

resourcesRouter.get(
  '/',
  getResources
)

resourcesRouter.get(
  '/topic/:topicId',
  validate(z.object({ params: z.object({
    topicId: z.string().trim().min(1)
  })})),
  getResourcesByTopicId
)

resourcesRouter.get(
  'topic/slug/:slug',
  validate(z.object({ params: z.object({
    slug: z.string().trim().min(1)
  })})),
  getResourcesByTopicSlug
)

resourcesRouter.get(
  '/me',
  authMiddleware,
  getResourcesByUserId
)

resourcesRouter.get(
  '/vote/:resourceId',
  validate(z.object({params: z.object({
    resourceId: z.string().cuid(),
  })})),
  getResourceVote
)

resourcesRouter.put(
  '/vote/:resourceId/:vote',
  authMiddleware,
  validate(z.object({params: z.object({
    resourceId: z.string().cuid(),
    vote: z.coerce.number().int().min(-1).max(1)
  })})),
  putResourceVote
)

export { resourcesRouter }
