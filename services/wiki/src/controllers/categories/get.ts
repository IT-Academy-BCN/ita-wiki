import Koa, { Middleware } from 'koa'
import db from '../../db/knex'

export const getCategories: Middleware = async (ctx: Koa.Context) => {
  const categories = await db('category').select('id', 'name', 'slug')
  ctx.status = 200
  ctx.body = categories
}
