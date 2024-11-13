import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import { NotFoundError } from '../../helpers/errors'
import db from '../../db/knex'
import { TTopic } from '../../helpers/wiki/transformResourceToAPI'

export const patchTopic: Middleware = async (ctx: Koa.Context) => {
  const { id, ...newData } = ctx.request.body
  const topic = await db<TTopic>('topic').where({ id }).first()

  if (!topic) {
    throw new NotFoundError('Topic not found')
  }

  let updatedName: string = topic.name
  let updatedSlug: string = topic.slug
  if (topic.name !== newData.name) {
    updatedSlug = slugify(newData.name, { lower: true })
    updatedName = newData.name
  }

  let updatedCategoryId: string = topic.category_id
  if (topic.category_id !== newData.categoryId) {
    updatedCategoryId = newData.categoryId
  }

  await db('topic').where({ id }).update({
    name: updatedName,
    slug: updatedSlug,
    category_id: updatedCategoryId,
    updated_at: new Date(),
  })

  ctx.status = 204
}
