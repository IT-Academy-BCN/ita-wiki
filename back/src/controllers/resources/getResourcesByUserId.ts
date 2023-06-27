import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { addVoteCountToResource } from '../../helpers/addVoteCountToResource'
import { resourceGetSchema } from '../../schemas'

export const getResourcesByUserId: Middleware = async (ctx: Koa.Context) => {
  const { userId } = ctx.params
  const categorySlug = ctx.query.categorySlug?.toString()

  let resources

  if (!categorySlug) {
    resources = await prisma.resource.findMany({
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
  } else {
    const topicsInCategory = await prisma.topic.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
    })
    resources = await prisma.resource.findMany({
      where: {
        // userId,
        topics: {
          some: {
            topicId: {
              in: topicsInCategory.map(({ id }) => id),
            },
          },
        },
      },
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
  }

  const parsedResources = resources.map((resource) => {
    const resourceWithVote = addVoteCountToResource(resource)
    return resourceGetSchema.parse(resourceWithVote)
  })
  ctx.status = 200
  ctx.body = { resources: parsedResources }
}
