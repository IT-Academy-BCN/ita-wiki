import Router from '@koa/router'
import { pathRoot } from './routes'
import { parse } from '../middleware/validate'
import { z } from '../openapi/zod'
import { getUsersIdNameController } from '../controllers/users/getNameById'
import { usersGetNameByIdParamSchema } from '../schemas/users/usersGetNameByIdSchema'

export const usersRoutes = new Router()

usersRoutes.prefix(pathRoot.v1.users)

usersRoutes.get(
  '/name',
  parse(z.object({ query: usersGetNameByIdParamSchema }), {
    useQsParser: true,
    useQueryString: true,
    arrayParams: ['id'],
  }),
  getUsersIdNameController
)
