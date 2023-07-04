import Koa, { Middleware } from 'koa'
import { User } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const deleteResource: Middleware = async (ctx: Koa.Context) => {
  const newData = ctx.request.body
  const user = ctx.params as User
  const resourceToDelete = await prisma.resource.findFirst({
    where: {
      id: newData.id,
      userId: user.id,
    },
  })

  if (!resourceToDelete) {
    throw new NotFoundError()
  }
  await prisma.topicsOnResources.deleteMany({
    where: { resourceId: newData.id },
  })
  await prisma.resource.deleteMany({
    where: {
      id: newData.id,
      userId: user.id,
    },
  })

  ctx.status = 204
}
