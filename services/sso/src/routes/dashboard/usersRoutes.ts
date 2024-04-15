import Router from '@koa/router'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { pathRoot } from '../routes'
import { dashboardListUsers } from '../../controllers/dashboard/users/list'
import { parse, validate } from '../../middleware/validate'
import { z } from '../../openapi/zod'
import { dashboardUsersListQuerySchema } from '../../schemas'
import { getMe } from '../../controllers/dashboard/users/getMe'
import { userIdSchema } from '../../schemas/users/userSchema'
import { dashboardDeleteUser } from '../../controllers/dashboard/users/delete'

export const dashboardUsersRoutes = new Router()

dashboardUsersRoutes.prefix(pathRoot.v1.dashboard.users)

dashboardUsersRoutes.get(
  '/',
  authenticate,
  authorize('ADMIN'),
  parse(z.object({ query: dashboardUsersListQuerySchema }), {
    useQsParser: true,
    useQueryString: true,
  }),
  dashboardListUsers
)
dashboardUsersRoutes.get('/me', authenticate, authorize('ADMIN'), getMe)

dashboardUsersRoutes.delete(
  '/:id',
  validate(z.object({ id: userIdSchema })),
  authenticate,
  authorize('ADMIN'),
  dashboardDeleteUser
)
