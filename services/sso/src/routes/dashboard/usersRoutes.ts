import Router from '@koa/router'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { pathRoot } from '../routes'
import { dashboardListUsers } from '../../controllers/dashboard/users/list'
import { parse } from '../../middleware/validate'
import { z } from '../../openapi/zod'
import { dashboardUsersListQuerySchema } from '../../schemas'
import { getMe } from '../../controllers/dashboard/users/getMe'
import { dashboardUpdateUser } from '../../controllers/dashboard/users/update'

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

dashboardUsersRoutes.patch(
  '/users/:userId',
  authenticate,
  authorize('ADMIN'),
  dashboardUpdateUser
)
