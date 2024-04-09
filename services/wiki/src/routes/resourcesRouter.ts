import Router from '@koa/router'
import { z } from 'zod'
import { authenticate, getUserFromToken, parse, validate } from '../middleware'
import {
  listResources,
  getResourcesById,
  getResourcesByUserId,
  getFavoriteResources,
  postResource,
} from '../controllers'
import { resourceCreateSchema, resourcesListParamsSchema } from '../schemas'
import { pathRoot } from './routes'
import { patchResource } from '../controllers/resources/patchResource'
import { resourcePatchSchema } from '../schemas/resource/resourcePatchSchema'

const resourcesRouter = new Router()

resourcesRouter.prefix(pathRoot.v1.resources)

resourcesRouter.post(
  '/',
  authenticate,
  validate(z.object({ body: resourceCreateSchema })),
  postResource
)

resourcesRouter.get(
  '/',
  getUserFromToken,
  parse(
    z.object({
      query: resourcesListParamsSchema,
    }),
    { useQueryString: true, useQsParser: true }
  ),
  listResources
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
  '/:id',
  validate(
    z.object({
      params: z.object({
        id: z.string().cuid(),
      }),
    })
  ),
  getResourcesById
)

resourcesRouter.patch(
  '/',
  authenticate,
  validate(z.object({ body: resourcePatchSchema })),
  patchResource
)

export { resourcesRouter }
