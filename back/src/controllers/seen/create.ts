import Koa, { Middleware } from 'koa'

import { User } from '@prisma/client'
import { MissingParamError, NotFoundError } from '../../helpers/errors'
import { prisma } from '../../prisma/client'

export const createSeenResource: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const { resourceId } = ctx.params
  if (!resourceId) throw new MissingParamError('resourceId')
  const resourceFound = await prisma.resource.findUnique({
    where: {
      id: resourceId,
    },
  })

  if (!resourceFound) throw new NotFoundError('Resource not found')
  await prisma.viewedResource.upsert({
    create: { userId: user.id, resourceId },
    update: {},
    where: {
      userId_resourceId: {
        userId: user.id,
        resourceId,
      },
    },
  })
  ctx.status = 204
}
