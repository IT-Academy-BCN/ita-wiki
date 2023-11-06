import Router from '@koa/router'
import { loginController, logoutController } from '../controllers/auth'
// import { z } from 'zod'
// import { validate, authenticate } from '../middleware'
// import { userLoginSchema, userRegisterSchema } from '../schemas'
import { pathRoot } from './routes'

export const authRoutes = new Router()

authRoutes.prefix(pathRoot.v1.auth)

authRoutes.post(
  '/login',
  //   validate(z.object({ body: userLoginSchema })),
  loginController
)

authRoutes.get('/logout', logoutController)
