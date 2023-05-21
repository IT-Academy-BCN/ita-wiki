import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'
import { NotFoundError } from '../helpers/errors'

export const getTopics: Middleware = async (ctx: Koa.Context) => {
  const { categoryId, slug } = ctx.query as {
    categoryId?: string
    slug?: string
  }

  const where = {}
  if (categoryId) {
    const exists = await prisma.category.findUnique({
      where: { id: categoryId },
    })
    if (!exists) throw new NotFoundError('No category found with this id')

    // @ts-ignore
    where.categoryId = categoryId
  } else if (slug) {
    const exists = await prisma.category.findUnique({ where: { slug } })
    if (!exists) throw new NotFoundError('No category found with this slug')

    // @ts-ignore
    where.category = { slug }
  }

  const topics = await prisma.topic.findMany({
    where,
    select: {
      id: true,
      name: true,
      slug: true,
      categoryId: true,
    },
  })
  ctx.status = 200
  ctx.body = { topics }
}
