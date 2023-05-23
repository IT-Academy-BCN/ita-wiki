import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { addVoteCountToResource } from '../../helpers/addVoteCountToResource'
import { resourceGetSchema } from '../../schemas'

export const getResourcesByUserId: Middleware = async (ctx: Koa.Context) => {
  const { userId } = ctx.params

  const resources = await prisma.resource.findMany({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      vote: { select: { vote: true } },
      topics: { select: { topic: true } },
    },
  })
  const resourcesWithVoteCount = addVoteCountToResource(resources)
  const parsedResources = resourcesWithVoteCount.map((resource) => {
    return resourceGetSchema.parse(resource)
  })
  ctx.status = 200
  ctx.body = { resources: parsedResources }
}
