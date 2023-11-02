import Router from '@koa/router'
import { z } from 'zod'
import { authenticate, getUserFromToken, parse, validate } from '../middleware'
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
import { patchResource } from '../controllers/resources/patchResource'
import { resourcePatchSchema } from '../schemas/resource/resourcePatchSchema'

const resourcesRouter = new Router()

resourcesRouter.prefix(pathRoot.v1.resources)

resourcesRouter.post(
  '/',
  authenticate,
  validate(z.object({ body: resourceCreateSchema })),
  createResource
)

resourcesRouter.get(
  '/',
  getUserFromToken,
  parse(
    z.object({
      query: resourcesGetParamsSchema,
    }),
    { useQueryString: true, useQsParser: true }
  ),
  getResources
)

resourcesRouter.get(
  '/me',
  authenticate,
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
  authenticate,
  validate(
    z.object({
      params: z.object({
        categorySlug: z.string().optional(),
      }),
    })
  ),
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

resourcesRouter.patch(
  '/',
  authenticate,
  validate(z.object({ body: resourcePatchSchema })),
  patchResource
)

export { resourcesRouter }
