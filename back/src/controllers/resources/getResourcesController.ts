import Koa, { Middleware } from 'koa'
import qs from 'qs'
import { Prisma, RESOURCE_TYPE, RESOURCE_STATUS } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { addVoteCountToResource } from '../../helpers/addVoteCountToResource'
import { resourceGetSchema } from '../../schemas'

export const getResources: Middleware = async (ctx: Koa.Context) => {
  const parsedQuery = qs.parse(ctx.querystring, { ignoreQueryPrefix: true })
  const { resourceTypes, topic, slug, status } = parsedQuery as {
    resourceTypes?: (keyof typeof RESOURCE_TYPE)[]
    topic?: string
    slug?: string
    status?: (keyof typeof RESOURCE_STATUS)[]
  }

  const where: Prisma.ResourceWhereInput = {
    topics: {
      some: {
        topic: { category: { slug }, id: topic },
      },
    },
    resourceType: { in: resourceTypes },
    status: { in: status },
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
    return resourceGetSchema.parse(resourceWithVote)
  })

  ctx.status = 200
  ctx.body = parsedResources
}
