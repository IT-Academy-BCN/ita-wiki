import { z } from 'zod'
import Router from '@koa/router'
import { USER_ROLE } from '@prisma/client'
import { createCategory, getCategories, patchCategory } from '../controllers'
import { pathRoot } from './routes'
import { authenticate, authorize, validate } from '../middleware'
import { categoryCreateSchema, categoryPatchSchema } from '../schemas'

const categoriesRouter = new Router()

categoriesRouter.prefix(pathRoot.v1.categories)

categoriesRouter.get('/', getCategories)
categoriesRouter.post(
  '/',
  authenticate,
  authorize(USER_ROLE.ADMIN),
  validate(z.object({ body: categoryCreateSchema })),
  createCategory
)
categoriesRouter.patch(
  '/',
  authenticate,
  authorize(USER_ROLE.ADMIN),
  validate(z.object({ body: categoryPatchSchema })),
  patchCategory
)

export { categoriesRouter }
