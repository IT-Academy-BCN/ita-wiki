import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { addVoteCountToResource } from '../../helpers/addVoteCountToResource'
import { resourceGetSchema } from '../../schemas'

export const getResources: Middleware = async (ctx: Koa.Context) => {
  const { type, topic } = ctx.query

  const where = {}
  if (type)
    // @ts-ignore
    where.resourceType = { equals: type }
  if (topic)
    // @ts-ignore
    where.topics = { some: { topic: { name: topic } } }

  const resources = await prisma.resource.findMany({
    where,
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
