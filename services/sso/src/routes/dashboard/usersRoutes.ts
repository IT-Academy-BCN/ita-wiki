import Router from '@koa/router'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { pathRoot } from '../routes'
import { dashboardListUsers } from '../../controllers/dashboard/users/list'
import { parse, validate } from '../../middleware/validate'
import { z } from '../../openapi/zod'
import { getMe } from '../../controllers/dashboard/users/getMe'
import { dashboardUsersListQuerySchema } from '../../schemas'
import { dashboardUpdateUser } from '../../controllers/dashboard/users/update'
import { userIdSchema } from '../../schemas/users/userSchema'
import { dashboardUserUpdateSchema } from '../../schemas/users/dashboardUserUpdateSchema'

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
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(
    z.object({
      params: z.object({ id: userIdSchema }),
      body: dashboardUserUpdateSchema,
    })
  ),
  dashboardUpdateUser
)
