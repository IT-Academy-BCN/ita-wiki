import Router from '@koa/router'
import { authenticateCookie } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { pathRoot } from '../routes'
import { dashboardListUsers } from '../../controllers/dashboard/users/list'
import { parse } from '../../middleware/validate'
import { z } from '../../openapi/zod'
import { dashboardUsersListQuerySchema } from '../../schemas'

export const dashboardUsersRoutes = new Router()

dashboardUsersRoutes.prefix(pathRoot.v1.dashboard.users)

dashboardUsersRoutes.get(
  '/',
  authenticateCookie,
  authorize('ADMIN'),
  parse(z.object({ query: dashboardUsersListQuerySchema }), {
    useQsParser: true,
    useQueryString: true,
  }),
  dashboardListUsers
)
