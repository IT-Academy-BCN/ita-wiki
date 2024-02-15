import Router from '@koa/router'
import { authenticateCookie } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { pathRoot } from '../routes'
import { dashboardListUsers } from '../../controllers/dashboard/users/list'

export const dashboardUsersRoutes = new Router()

dashboardUsersRoutes.prefix(pathRoot.v1.dashboard.users)

dashboardUsersRoutes.get(
  '/',
  authenticateCookie,
  authorize('ADMIN'),
  dashboardListUsers
)
