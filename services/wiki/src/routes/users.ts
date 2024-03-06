import Router from '@koa/router'
import { z } from 'zod'
import { getUsers, patchUser } from '../controllers'
import { pathRoot } from './routes'
import { authenticate, authorize, validate } from '../middleware'
import { userPatchSchema } from '../schemas'
import { UserRole } from '../schemas/users/userSchema'

const usersRouter = new Router()
usersRouter.prefix(pathRoot.v1.users)

usersRouter.get('/', authenticate, authorize(UserRole.ADMIN), getUsers)

usersRouter.patch(
  '/',
  validate(z.object({ body: userPatchSchema })),
  authenticate,
  authorize(UserRole.ADMIN),
  patchUser
)

export { usersRouter }
