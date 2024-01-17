import { z } from 'zod'
import Router from '@koa/router'
import { createCategory, getCategories, patchCategory } from '../controllers'
import { pathRoot } from './routes'
import { authenticate, authorize, validate } from '../middleware'
import { categoryCreateSchema, categoryPatchSchema } from '../schemas'
import { UserRole } from '../schemas/users/userSchema'

const categoriesRouter = new Router()

categoriesRouter.prefix(pathRoot.v1.categories)

categoriesRouter.get('/', getCategories)
categoriesRouter.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(z.object({ body: categoryCreateSchema })),
  createCategory
)
categoriesRouter.patch(
  '/id/:categoryId',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(z.object({ body: categoryPatchSchema })),
  patchCategory
)

export { categoriesRouter }
