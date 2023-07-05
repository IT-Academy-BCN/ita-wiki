import Koa, { Middleware } from 'koa'
import qs from 'qs'
import { Prisma, RESOURCE_TYPE, RESOURCE_STATUS } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { addVoteCountToResource } from '../../helpers/addVoteCountToResource'
import { resourceGetSchema } from '../../schemas'

export const getResources: Middleware = async (ctx: Koa.Context) => {
  const { category } = ctx.params
  const parsedQuery = qs.parse(ctx.querystring, { ignoreQueryPrefix: true })
  const { resourceType, topic, status } = parsedQuery as {
    resourceType?: RESOURCE_TYPE
    topic?: string
    status?: RESOURCE_STATUS
  }

  const where: Prisma.ResourceWhereInput = {
    topics: {
      some: {
        topic: { category: { slug: category } },
      },
    },
  }

  if (resourceType) {
    where.resourceType = { equals: resourceType }
  }

  if (topic) {
    where.topics = { some: { topic: { name: topic } } }
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
    // Remove the topic key, return directly the array of topics in the topic property
    const sanitizedResource = {
      ...resourceWithVote,
      topics: resource.topics,
    }
    // return parsed values to: 1. make sure it returns what we say it returns 2. delete private fields like userId
    return resourceGetSchema.parse(sanitizedResource)
  })

  ctx.status = 200
  ctx.body = parsedResources
}
