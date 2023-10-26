import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import { prisma } from '../../prisma/client'

export const createCategory: Middleware = async (ctx: Koa.Context) => {
  const category = ctx.request.body

  const slug = slugify(category.name, { lower: true })

  await prisma.category.create({
    data: { ...category, slug },
  })

  ctx.status = 204
}
