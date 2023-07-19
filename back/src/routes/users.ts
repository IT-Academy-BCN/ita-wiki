import Router from '@koa/router'
import { USER_ROLE } from '@prisma/client'
import { getUsers } from '../controllers'
import { pathRoot } from './routes'
import { authenticate, authorize } from '../middleware'

const usersRouter = new Router()
usersRouter.prefix(pathRoot.v1.users)

usersRouter.get('/', authenticate, authorize(USER_ROLE.ADMIN), getUsers)

export { usersRouter }
