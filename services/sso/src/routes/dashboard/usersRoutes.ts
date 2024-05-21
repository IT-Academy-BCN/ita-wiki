import Router from '@koa/router'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { pathRoot } from '../routes'
import { dashboardListUsers } from '../../controllers/dashboard/users/list'
import { parse, validate } from '../../middleware/validate'
import { z } from '../../openapi/zod'
import { getMe } from '../../controllers/dashboard/users/getMe'
import { dashboardUsersListQuerySchema } from '../../schemas'
import { dashboardUserUpdateSchema } from '../../schemas/users/dashboardUserUpdateSchema'
import { userIdSchema } from '../../schemas/users/userSchema'
import { dashboardDeleteUser } from '../../controllers/dashboard/users/delete'
import { updateUser } from '../../controllers/users/update'
import { dashboardUsersUpdateStatusSchema } from '../../schemas/users/dashboardUsersUpdateStatusSchema'
import { dashboardUpdateStatusUsers } from '../../controllers/dashboard/users/updateStatus'
import { dashboardBatchDelete } from '../../controllers/dashboard/users/batchDelete'

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
  updateUser
)

dashboardUsersRoutes.delete(
  '/',
  validate(z.object({ body: z.object({ ids: userIdSchema.array() }) })),
  authenticate,
  authorize('ADMIN'),
  dashboardBatchDelete
)

dashboardUsersRoutes.delete(
  '/:id',
  validate(z.object({ params: z.object({ id: userIdSchema }) })),
  authenticate,
  authorize('ADMIN'),
  dashboardDeleteUser
)

dashboardUsersRoutes.post(
  '/status',
  authenticate,
  authorize('ADMIN'),
  validate(z.object({ body: dashboardUsersUpdateStatusSchema })),
  dashboardUpdateStatusUsers
)
