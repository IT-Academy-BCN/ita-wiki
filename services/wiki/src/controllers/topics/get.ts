import Koa, { Middleware } from 'koa'
import db from '../../db/knex'
import { NotFoundError } from '../../helpers/errors'

export const getTopics: Middleware = async (ctx: Koa.Context) => {
  const { categoryId, slug } = ctx.query as {
    categoryId?: string
    slug?: string
  }

  let where: Record<string, any> = {}

  // Check if categoryId is provided and valid
  if (categoryId) {
    const exists = await db('category').where({ id: categoryId }).first()
    if (!exists) throw new NotFoundError('No category found with this id')

    where.categoryId = categoryId
  } else if (slug) {
    // Check if slug is provided and valid
    const exists = await db('category').where({ slug }).first()
    if (!exists) throw new NotFoundError('No category found with this slug')

    where = { 'category.slug': slug }
  }

  const topics = await db('topic')
    .select(
      'topic.id as id',
      'topic.name as name',
      'topic.slug as slug',
      'topic.category_id as category_id'
    )
    .modify((queryBuilder) => {
      if (categoryId) {
        queryBuilder.where({ category_id: categoryId })
      } else if (slug) {
        queryBuilder
          .join('category', 'topic.category_id', 'category.id')
          .where('category.slug', slug)
      }
    })
  ctx.status = 200
  ctx.body = topics
}
