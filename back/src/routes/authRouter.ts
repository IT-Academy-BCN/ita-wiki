import Router from '@koa/router'
import { z } from 'zod'
import { loginController, registerController } from '../controllers'
import { validate } from '../middleware'
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

export { authRouter }
