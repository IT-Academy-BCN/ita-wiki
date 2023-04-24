import Router from '@koa/router'
import { getCategories } from '../controllers'
import { pathRoot } from './routes'

const categoriesRouter = new Router()

categoriesRouter.prefix(pathRoot.v1.categories)

categoriesRouter.get(
  '/',
  getCategories
)

export { categoriesRouter }