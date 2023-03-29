import Router from '@koa/router'
import { z } from 'zod'
import { loginController } from '../controllers'
import { validate } from '../middleware'
import { UserLoginSchema } from '../schemas'

const authRouter = new Router()

authRouter.prefix('/api/v1/auth')

authRouter.post(
  '/login',
  validate(z.object({ body: UserLoginSchema })),
  loginController
)

export { authRouter }
