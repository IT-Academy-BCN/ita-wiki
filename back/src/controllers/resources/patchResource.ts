import Koa, { Middleware } from 'koa'
import { User } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '../../prisma/client'
import { NotFoundError, UnauthorizedError } from '../../helpers/errors'
import { resourcePatchSchema } from '../../schemas/resource/resourcePatchSchema'

type ResourcePatch = z.infer<typeof resourcePatchSchema>

export const patchResource: Middleware = async (ctx: Koa.Context) => {
  const { topicId, ...newData } = ctx.request.body as ResourcePatch
  const user = ctx.user as User

  const resource = await prisma.resource.findFirst({
    where: { id: newData.id },
  })

  if (!resource) {
    throw new NotFoundError('Resource not found')
  }

  if (resource.userId !== user.id) {
    throw new UnauthorizedError('You are not allowed to update this resource')
  }

  await prisma.$transaction(async (tx) => {
    await tx.resource.update({
      where: { id: newData.id },
      data: {
        ...newData,
      },
    })

    if (topicId) {
      await tx.topicsOnResources.deleteMany({
        where: { resourceId: newData.id },
      })

      await tx.topicsOnResources.create({
        data: {
          resourceId: newData.id,
          topicId,
        },
      })
    }
  })

  ctx.status = 204
}
