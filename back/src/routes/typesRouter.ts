import Router from '@koa/router'
import { getTypes } from '../controllers'
import { pathRoot } from './routes'

const typesRouter = new Router()

typesRouter.prefix(pathRoot.v1.types)

typesRouter.get('/', getTypes)

export { typesRouter }
