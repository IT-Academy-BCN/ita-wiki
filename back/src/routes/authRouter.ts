import Router from '@koa/router'
import { z } from 'zod'
import { loginController } from '../controllers'
import { registerController } from '../controllers/registerController'
import { validate } from '../middleware'
import { UserLoginSchema, UserRegisterSchema } from '../schemas'

const authRouter = new Router()

authRouter.prefix('/api/v1/auth')

authRouter.post(
  '/login',
  validate(z.object({ body: UserLoginSchema })),
  loginController
)

authRouter.post(
  '/register',
  validate(z.object({ body: UserRegisterSchema })),
  registerController
)

export { authRouter }
