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
  getFavoriteResources,
} from '../controllers'
import { resourceCreateSchema, resourcesGetParamsSchema } from '../schemas'
import { pathRoot } from './routes'

const resourcesRouter = new Router()

resourcesRouter.prefix(pathRoot.v1.resources)

resourcesRouter.post(
  '/',
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
resourcesRouter.get(
  '/me',
  authMiddleware,
  validate(
    z.object({
      query: z.object({
        categorySlug: z.string().trim().min(1).optional(),
      }),
    })
  ),
  getResourcesByUserId
)

resourcesRouter.get(
  '/favorites/:categorySlug?',
  authMiddleware,
  getFavoriteResources
)
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
