import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { addVoteCountToResource } from '../../helpers/transformResourceToAPI'
import { resourceGetSchema } from '../../schemas'
import { NotFoundError } from '../../helpers/errors'

export const getResourcesById: Middleware = async (ctx: Koa.Context) => {
  const { resourceId } = ctx.params
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      vote: { select: { vote: true } },
      topics: { select: { topic: true } },
    },
  })
  if (!resource) throw new NotFoundError('Resource not found')

  const resourceWithVote = addVoteCountToResource(resource)
  const parsedResource = resourceGetSchema.parse(resourceWithVote)
  ctx.status = 200
  ctx.body = parsedResource
}
