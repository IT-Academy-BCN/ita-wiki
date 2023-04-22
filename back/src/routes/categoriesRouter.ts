import Router from '@koa/router'
import { getCategories } from '../controllers'

const categoriesRouter = new Router()

categoriesRouter.prefix('/categories')

categoriesRouter.get(
  '/',
  getCategories
)

export { categoriesRouter }