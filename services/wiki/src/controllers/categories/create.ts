import Koa, { Middleware } from 'koa'
import container from '../../dependecy-inyection'
import { CategoryCreator } from '../../internal/categories/useCases/CategoryCreator'

export const createCategory: Middleware = async (ctx: Koa.Context) => {
  const category = ctx.request.body

  const categoryCreator: CategoryCreator = container.get('categoryCreator')
  await categoryCreator.run({ name: category.name })
  ctx.status = 204
}
