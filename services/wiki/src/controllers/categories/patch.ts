import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import db from '../../db/knex'
import { DuplicateError, NotFoundError } from '../../helpers/errors'

export const patchCategory: Middleware = async (ctx: Koa.Context) => {
  const newData = ctx.request.body
  const { categoryId } = ctx.params

  const category = await db('category').where({ id: categoryId }).first()

  if (!category) {
    ctx.status = 404
    throw new NotFoundError('Category not found')
  }

  if (newData.name) {
    if (newData.name === category.name) {
      ctx.status = 409
      throw new DuplicateError('Category name already exists')
    }

    const nameExists = await db('category')
      .where({ name: newData.name })
      .whereNot({ id: categoryId })
      .first()

    if (nameExists) {
      ctx.status = 409
      throw new DuplicateError('Category name already exists')
    }
  }

  await db('category')
    .update({
      ...newData,
      slug: slugify(newData.name, { lower: true }),
    })
    .where({ id: categoryId })

  ctx.status = 204
}
