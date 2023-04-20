import Router from '@koa/router'
import { getCategories } from '../controllers'

const categoriesRouter = new Router()

categoriesRouter.prefix('/api/v1/categories')

categoriesRouter.get(
  '/',
  getCategories
)

export { categoriesRouter }