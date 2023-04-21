import Router from '@koa/router'
import { z } from 'zod'
import { authMiddleware, validate } from '../middleware'
import { createResource, getResourcesByUserId } from '../controllers'
import { resourceCreateSchema } from '../schemas'

const resourcesRouter = new Router()

resourcesRouter.prefix('/api/v1/resources')

resourcesRouter.post(
  '/create',
  authMiddleware,
  validate(z.object({ body: resourceCreateSchema })),
  createResource
)

resourcesRouter.get(
  '/user/:userId',
  validate(z.object({ params: z.object({userId: z.string().cuid()}) })),
  getResourcesByUserId
)

export { resourcesRouter }
