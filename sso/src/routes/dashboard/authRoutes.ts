import Router from '@koa/router'
import z from 'zod'
import { pathRoot } from '../routes'
import { validate } from '../../middleware/validate'
import { dashboardLoginController } from '../../controllers/dashboard/auth/login'
import { loginSchema } from '../../schemas'
import { dashboardLogoutController } from '../../controllers/dashboard/auth/logout'

export const dashboardAuthRoutes = new Router()

dashboardAuthRoutes.prefix(pathRoot.v1.dashboard.auth)

dashboardAuthRoutes.post(
  '/login',
  validate(z.object({ body: loginSchema })),
  dashboardLoginController
)

dashboardAuthRoutes.post('/logout', dashboardLogoutController)
