import Router from '@koa/router'
import { pathRoot } from './routes'
import { parse, validate } from '../middleware/validate'
import { z } from '../openapi/zod'
import { listUsers } from '../controllers/users/list'
import { usersListSchema } from '../schemas/users/usersListSchema'
import { userUpdateSchema, validateSchema } from '../schemas'
import { getMe } from '../controllers/users/getMe'
import { authenticate } from '../middleware/authenticate'
import { updateUser } from '../controllers/users/update'
import { authorize } from '../middleware/authorize'
import { userIdSchema } from '../schemas/users/userSchema'

export const usersRoutes = new Router()

usersRoutes.prefix(pathRoot.v1.users)
usersRoutes.get(
  '/',
  parse(z.object({ query: usersListSchema }), {
    useQsParser: true,
    useQueryString: true,
    arrayParams: ['id', 'fields'],
  }),
  listUsers
)
usersRoutes.post(
  '/me',
  validate(z.object({ body: validateSchema })),
  authenticate,
  getMe
)
usersRoutes.patch(
  '/:id',
  validate(
    z.object({ params: z.object({ id: userIdSchema }), body: userUpdateSchema })
  ),
  authenticate,
  authorize('ADMIN'),
  updateUser
)
