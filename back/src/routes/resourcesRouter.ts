import Router from '@koa/router'
import { z } from 'zod'
import { authMiddleware, validate } from '../middleware'
import { createResource, getResourcesByUserId, getResources, putResourceVote } from '../controllers'
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
  '/me',
  authMiddleware,
  getResourcesByUserId
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
