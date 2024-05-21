import Router from '@koa/router'
import { pathRoot } from './routes'
import { validate as validateToken } from '../controllers/tokens/validate'
import { validate } from '../middleware/validate'
import { z } from '../openapi/zod'
import { validateSchema } from '../schemas/tokens/validateSchema'
import { authenticate } from '../middleware/authenticate'
import { refresh } from '../controllers/tokens/refresh'

export const tokensRoutes = new Router()

tokensRoutes.prefix(pathRoot.v1.tokens)

tokensRoutes.post(
  '/validate',
  validate(z.object({ body: validateSchema })),
  authenticate,
  validateToken
)
tokensRoutes.post('/refresh', authenticate, refresh)
