import Router from '@koa/router'
import { z } from 'zod'
import { loginController, registerController } from '../controllers'
import { errorMiddleware, validate } from '../middleware'
import { UserLoginSchema, UserRegisterSchema } from '../schemas'

const authRouter = new Router()

authRouter.prefix('/api/v1/auth')

authRouter.post(
  '/login',
  errorMiddleware,
  validate(z.object({ body: UserLoginSchema })),
  loginController
)

authRouter.post(
  '/register',
  errorMiddleware,
  validate(z.object({ body: UserRegisterSchema })),
  registerController
)

export { authRouter }
