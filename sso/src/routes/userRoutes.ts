import Router from '@koa/router'
import { pathRoot } from './routes'
import { authenticate } from '../middleware/authenticate'
import { getUserController } from '../controllers/user/get'
import { validate } from '../middleware/validate'
import { z } from '../openapi/zod'
import { validateSchema } from '../schemas/token/validateSchema'
import { userPatchSchema } from '../schemas/user/userPatchSchema'
import { patchUser } from '../controllers/user/patch'
import { authorize } from '../middleware/authorize'
import { UserRole } from '../schemas'

export const userRoutes = new Router()

userRoutes.prefix(pathRoot.v1.user)

userRoutes.post(
  '/',
  validate(z.object({ body: validateSchema })),
  authenticate,
  getUserController
)

userRoutes.patch(
  '/',
  validate(z.object({ body: userPatchSchema })),
  authenticate,
  authorize(UserRole.ADMIN),
  patchUser
)
