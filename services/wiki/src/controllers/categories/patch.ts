import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import { prisma } from '../../prisma/client'

export const patchCategory: Middleware = async (ctx: Koa.Context) => {
  const newData = ctx.request.body

  const { categoryId } = ctx.params

  await prisma.category.update({
    where: { id: categoryId },
    data: {
      ...newData,
      slug: slugify(newData.name, { lower: true }),
    },
  })

  ctx.status = 204
}
