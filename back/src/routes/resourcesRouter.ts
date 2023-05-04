import Router from '@koa/router'
import { z } from 'zod'
import { authMiddleware, validate } from '../middleware'
import { createResource, getResourcesByUserId, getResourcesByTopicId, getResources } from '../controllers'
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

resourcesRouter.get(
  '/topic/:topicId',
  validate(z.object({params: z.object({topicId: z.string().cuid()})})),
  getResourcesByTopicId
  
)

export { resourcesRouter }
