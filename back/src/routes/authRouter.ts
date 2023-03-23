import Router from '@koa/router'
import { loginController } from '../controllers'
import { parse, validate } from '../middleware'
import { UserLoginSchema } from '../schemas'

const authRouter = new Router()

authRouter.prefix('/api/v1/auth')

authRouter.post(
  '/login',
  parse(UserLoginSchema),
  validate(UserLoginSchema),
  loginController
)

export { authRouter }
