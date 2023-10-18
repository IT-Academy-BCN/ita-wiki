import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import { prisma } from '../../prisma/client'
import { MissingParamError, NotFoundError } from '../../helpers/errors'

export const patchCategory: Middleware = async (ctx: Koa.Context) => {
  const { id, ...newData } = ctx.request.body
  if (!id) throw new MissingParamError('resourceId')
  const category = await prisma.category.findFirst({ where: { id } })

  if (!category) throw new NotFoundError('Topic not found')

  let updatedName: string = category.name
  let updatedSlug: string = category.slug

  if (category.name !== newData.name) {
    updatedSlug = slugify(newData.name, { lower: true })
    updatedName = newData.name
  }

  await prisma.category.update({
    where: { id },
    data: {
      name: updatedName,
      slug: updatedSlug,
    },
  })

  ctx.status = 204
}
