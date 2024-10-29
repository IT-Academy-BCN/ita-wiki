import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import cuid from 'cuid'
import db from '../../db/knex'

export const createCategory: Middleware = async (ctx: Koa.Context) => {
  const category = ctx.request.body
  const id = cuid()
  const timestamps = { created_at: new Date(), updated_at: new Date() }

  const slug = slugify(category.name, { lower: true })
  const exists = await db('category').where({ name: category.name })
  if (exists.length > 0) {
    ctx.status = 409
    ctx.body = { error: 'Category already exists' }
    return
  }
  await db.insert({ id, ...category, slug, ...timestamps }).into('category')
  ctx.status = 204
}
