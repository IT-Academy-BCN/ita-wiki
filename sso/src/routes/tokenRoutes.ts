import Router from '@koa/router'
import { pathRoot } from './routes'
import { validate as validateToken } from '../controllers/token/validate'
import { validate } from '../middleware/validate'
import { z } from '../openapi/zod'
import { validateSchema } from '../schemas/token/validateSchema'

export const tokenRoutes = new Router()

tokenRoutes.prefix(pathRoot.v1.tokens)

tokenRoutes.post(
  '/validate',
  validate(z.object({ body: validateSchema })),
  validateToken
)
