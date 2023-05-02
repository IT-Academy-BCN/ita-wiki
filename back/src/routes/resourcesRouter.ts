import Router from '@koa/router'
import { z } from 'zod'
import { authMiddleware, validate } from '../middleware'
import { resourceCreateSchema } from '../schemas'
import { pathRoot } from './routes'

import { createResource, getResources, getResourcesByUserId } from '../controllers'


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

export { resourcesRouter }
