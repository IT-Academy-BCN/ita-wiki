import Router from '@koa/router'
// import { z } from 'zod'
// import { validate, authenticate } from '../middleware'
// import { userLoginSchema, userRegisterSchema } from '../schemas'
import { pathRoot } from './routes'
import { registerController } from '../controllers/user/registerController'

export const userRoutes = new Router()

userRoutes.prefix(pathRoot.v1.auth)

userRoutes.post(
  '/register',
  //   validate(z.object({ body: userRegisterSchema })),
  registerController
)
