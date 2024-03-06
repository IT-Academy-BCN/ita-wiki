import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const patchTopic: Middleware = async (ctx: Koa.Context) => {
  const { id, ...newData } = ctx.request.body

  const topic = await prisma.topic.findFirst({
    where: { id },
  })

  if (!topic) {
    throw new NotFoundError('Topic not found')
  }

  let updatedName: string = topic.name
  let updatedSlug: string = topic.slug
  if (topic.name !== newData.name) {
    updatedSlug = slugify(newData.name, { lower: true })
    updatedName = newData.name
  }

  let updatedCategoryId: string = topic.categoryId
  if (topic.categoryId !== newData.categoryId) {
    updatedCategoryId = newData.categoryId
  }

  await prisma.$transaction(async (tx) => {
    await tx.topic.update({
      where: { id },
      data: {
        id,
        name: updatedName,
        slug: updatedSlug,
        categoryId: updatedCategoryId,
      },
    })
  })

  ctx.status = 204
}
