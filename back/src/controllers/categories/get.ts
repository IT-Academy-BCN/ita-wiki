import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'

export const getCategories: Middleware = async (ctx: Koa.Context) => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  })
  ctx.status = 200
  ctx.body = categories
}
