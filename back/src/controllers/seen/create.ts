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

  const existingViewedResource = await prisma.viewedResource.findUnique({
    where: {
      userId_resourceId: {
        userId: user.id,
        resourceId,
      },
    },
  })

  if (!existingViewedResource) {
    await prisma.viewedResource.create({
      data: {
        userId: user.id,
        resourceId,
      },
    })
  }
  ctx.status = 204
}
