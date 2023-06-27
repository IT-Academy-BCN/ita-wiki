import Router from '@koa/router'
import { z } from 'zod'
import { authMiddleware, validate } from '../middleware'
import {
  createResource,
  getResources,
  getResourcesById,
  getResourcesByUserId,
  getResourcesByTopicId,
  getResourcesByTopicSlug,
} from '../controllers'
import { resourceCreateSchema, resourcesGetParamsSchema } from '../schemas'
import { pathRoot } from './routes'
import { modifyResource } from '../controllers/resources/modifyResource'
import { resourceModifySchema } from '../schemas/resource/resourceModifySchema'

const resourcesRouter = new Router()

resourcesRouter.prefix(pathRoot.v1.resources)

resourcesRouter.put(
  '/',
  //authMiddleware,
  validate(z.object({ body: resourceModifySchema })),
  modifyResource
)

resourcesRouter.post(
  '/create',
  authMiddleware,
  validate(z.object({ body: resourceCreateSchema })),
  createResource
)
resourcesRouter.get(
  '/',
  validate(
    z.object({
      query: resourcesGetParamsSchema,
    })
  ),
  getResources
)
resourcesRouter.get('/me', authMiddleware, getResourcesByUserId)
resourcesRouter.get(
  '/id/:resourceId',
  validate(
    z.object({
      params: z.object({
        resourceId: z.string().cuid(),
      }),
    })
  ),
  getResourcesById
)
resourcesRouter.get(
  '/topic/:topicId',
  validate(
    z.object({
      params: z.object({
        topicId: z.string().trim().min(1),
      }),
    })
  ),
  getResourcesByTopicId
)
resourcesRouter.get(
  '/topic/slug/:slug',
  validate(
    z.object({
      params: z.object({
        slug: z.string().trim().min(1),
      }),
    })
  ),
  getResourcesByTopicSlug
)

export { resourcesRouter }
