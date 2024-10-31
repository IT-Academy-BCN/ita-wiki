import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import cuid from 'cuid'
import db from '../../db/knex'

export const createTopic: Middleware = async (ctx: Koa.Context) => {
  const topic = ctx.request.body
  const id = cuid()
  const timestamps = { created_at: new Date(), updated_at: new Date() }
  const slug = slugify(topic.name, { lower: true })

  const exists = await db('topic').where({ name: topic.name })
  if (exists.length > 0) {
    ctx.status = 409
    ctx.body = { error: 'Topic already exists' }
    return
  }
  await db.insert({ id, ...topic, slug, ...timestamps }).into('topic')
  ctx.status = 204
}
