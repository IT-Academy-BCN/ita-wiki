import Router from '@koa/router'
import { z } from 'zod'
import { loginController, logoutController } from '../controllers/auth'
import { pathRoot } from './routes'
import { validate } from '../middleware/validate'
import { checkToken } from '../controllers/auth/checkToken'
import { registerController } from '../controllers/auth/registerController'
import { loginSchema, registerSchema } from '../schemas'

export const authRoutes = new Router()

authRoutes.prefix(pathRoot.v1.auth)

authRoutes.post(
  '/register',
  validate(z.object({ body: registerSchema })),
  registerController
)

authRoutes.post(
  '/login',
  validate(z.object({ body: loginSchema })),
  loginController
)

authRoutes.post('/check-token', checkToken)

authRoutes.get('/logout', logoutController)
