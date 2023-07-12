import Router from '@koa/router'
import { z } from 'zod'
import { authMiddleware, validate } from '../middleware'
import { getVote, putVote } from '../controllers'
import { pathRoot } from './routes'

const voteRouter = new Router()

voteRouter.prefix(pathRoot.v1.vote)

voteRouter.get(
  '/:resourceId',
  validate(
    z.object({
      params: z.object({
        resourceId: z.string().cuid(),
      }),
    })
  ),
  getVote
)

voteRouter.put(
  '/',
  authMiddleware(),
  validate(
    z.object({
      body: z.object({
        resourceId: z.string().cuid(),
        vote: z.enum(['up', 'down', 'cancel']),
      }),
    })
  ),
  putVote
)

export { voteRouter }
