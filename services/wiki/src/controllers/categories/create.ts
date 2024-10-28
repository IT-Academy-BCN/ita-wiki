import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import db from '../../db/knex'

export const createCategory: Middleware = async (ctx: Koa.Context) => {
  const category = ctx.request.body

  const slug = slugify(category.name, { lower: true })
  const exists = await db('category').where({ name: category.name })
  if (exists.length > 0) {
    ctx.status = 409
    ctx.body = { error: 'Category already exists' }
    return
  }
  await db.insert({ ...category, slug }).into('category')
  ctx.status = 204
}
