import Koa, { Middleware } from 'koa'
import { Prisma, RESOURCE_TYPE } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { addVoteCountToResource } from '../../helpers/addVoteCountToResource'
import { resourceGetSchema } from '../../schemas'

export const getResources: Middleware = async (ctx: Koa.Context) => {
  const { resourceType, topic, category, status } = ctx.query as {
    resourceType?: RESOURCE_TYPE
    topic?: string
    category?: string
    status?: string
  }

  const where: Prisma.ResourceWhereInput = {}
  if (resourceType) {
    where.resourceType = { equals: resourceType }
  }

  if (topic && category) {
    where.topics = {
      some: {
        topic: { AND: { name: topic, category: { slug: category } } },
      },
    }
  } else if (topic) {
    where.topics = { some: { topic: { name: topic } } }
  } else if (category) {
    where.topics = { some: { topic: { category: { slug: category } } } }
  }

  if (status) {
    where.status = { equals: status }
  }

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
  const parsedResources = resources.map((resource) => {
    const resourceWithVote = addVoteCountToResource(resource)
    // return parsed values to: 1. make sure it returns what we say it returns 2. delete private fields like userId
    return resourceGetSchema.parse(resourceWithVote)
  })
  ctx.status = 200
  ctx.body = { resources: parsedResources }
}
