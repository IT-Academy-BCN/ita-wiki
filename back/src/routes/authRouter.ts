import Router from '@koa/router'
import { z } from 'zod'
import { authMeController, loginController, registerController } from '../controllers'
import { validate, authMiddleware } from '../middleware'
import { userLoginSchema, userRegisterSchema } from '../schemas'
import { pathRoot } from './routes'

const authRouter = new Router()

authRouter.prefix(pathRoot.v1.auth)

authRouter.post(
  '/login',
  validate(z.object({ body: userLoginSchema })),
  loginController
)

authRouter.post(
  '/register',
  validate(z.object({ body: userRegisterSchema })),
  registerController
)

authRouter.get(
  '/me',
  authMiddleware,
  authMeController
)

export { authRouter }
