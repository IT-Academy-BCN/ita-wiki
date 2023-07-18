import Router from '@koa/router'
import { USER_ROLE } from '@prisma/client'
import { z } from 'zod'
import { getUsers, modifyUser } from '../controllers'
import { pathRoot } from './routes'
import { authenticate, authorize, validate } from '../middleware'
import { userPatchSchema } from '../schemas'

const usersRouter = new Router()
usersRouter.prefix(pathRoot.v1.users)

usersRouter.get('/', authenticate, authorize(USER_ROLE.ADMIN), getUsers)

usersRouter.patch(
  '/',
  authenticate,
  authorize(USER_ROLE.ADMIN),
  validate(z.object({ body: userPatchSchema })),
  modifyUser
)

export { usersRouter }
