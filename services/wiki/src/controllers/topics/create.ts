import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import cuid from 'cuid'
import db from '../../db/knex'

export const createTopic: Middleware = async (ctx: Koa.Context) => {
  const topic = ctx.request.body
  console.log('res1', topic)
  const id = cuid()
  const timestamps = { created_at: new Date(), updated_at: new Date() }
  const slug = slugify(topic.name, { lower: true })

  const exists = await db('topic').where({ name: topic.name })
  if (exists.length > 0) {
    ctx.status = 409
    ctx.body = { error: 'Topic already exists' }
    return
  }
  const response = await db('topic')
    .insert(topic)
    .insert({ id, ...topic, slug, ...timestamps })
    .returning('*')
  console.log('res2', response)
  ctx.status = 204
}
