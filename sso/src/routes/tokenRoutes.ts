import Router from '@koa/router'
import { pathRoot } from './routes'
import { checkToken } from '../controllers/auth/checkToken'

export const tokenRoutes = new Router()

tokenRoutes.prefix(pathRoot.v1.tokens)

tokenRoutes.post('/check-token', checkToken)
