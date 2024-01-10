import Router from '@koa/router'
import { pathRoot } from './routes'
import { authenticate } from '../middleware/authenticate'
import { getUserController } from '../controllers/user/get'
import { validate } from '../middleware/validate'
import { z } from '../openapi/zod'
import { validateSchema } from '../schemas/token/validateSchema'

export const userRoutes = new Router()

userRoutes.prefix(pathRoot.v1.user)

userRoutes.post(
  '/',
  validate(z.object({ body: validateSchema })),
  authenticate,
  getUserController
)
