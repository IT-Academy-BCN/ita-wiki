import Router from '@koa/router'
import { loginController, logoutController } from '../controllers/auth'
import { pathRoot } from './routes'
import { loginSchema } from '../schemas/auth/loginSchema'
import { validate } from '../middleware/validate'
import { z } from '../openapi/zod'

export const authRoutes = new Router()

authRoutes.prefix(pathRoot.v1.auth)

authRoutes.post(
  '/login',
  validate(z.object({ body: loginSchema })),
  loginController
)

authRoutes.get('/logout', logoutController)
