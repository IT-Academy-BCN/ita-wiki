import cuid from 'cuid'
import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import db from '../../db/knex'

export const createTopic: Middleware = async (ctx: Koa.Context) => {
  const topic = ctx.request.body

  await db('topic').insert({
    id: cuid(),
    name: topic.name,
    slug: slugify(topic.name, { lower: true }),
    category_id: topic.categoryId,
    updated_at: new Date(),
    created_at: new Date(),
  })

  ctx.status = 204
}
