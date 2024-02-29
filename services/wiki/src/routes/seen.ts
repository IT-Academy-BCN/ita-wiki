import Router from '@koa/router'
import { z } from 'zod'
import { authenticate, validate } from '../middleware'
import { createSeenResource } from '../controllers'
import { pathRoot } from './routes'

const seenRouter = new Router()

seenRouter.prefix(pathRoot.v1.seen)

seenRouter.post(
  '/:resourceId',
  authenticate,
  validate(
    z.object({
      params: z.object({
        resourceId: z.string().cuid(),
      }),
    })
  ),
  createSeenResource
)

export { seenRouter }
