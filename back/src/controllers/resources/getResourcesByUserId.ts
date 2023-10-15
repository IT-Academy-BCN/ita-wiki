import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { transformResourceToAPI } from '../../helpers/transformResourceToAPI'
import { resourceGetSchema } from '../../schemas'

export const getResourcesByUserId: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const categorySlug = ctx.query.categorySlug?.toString()

  let resources

  const include = {
    user: {
      select: {
        name: true,
      },
    },
    vote: { select: { vote: true } },
    topics: { select: { topic: true } },
  }

  if (!categorySlug) {
    resources = await prisma.resource.findMany({
      where: { userId: user.id },
      include,
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
        userId: user.id,
        topics: {
          some: {
            topicId: {
              in: topicsInCategory.map(({ id }) => id),
            },
          },
        },
      },
      include,
    })
  }

  const parsedResources = resources.map((resource) => {
    const resourceWithVote = transformResourceToAPI(resource)
    return resourceGetSchema.parse(resourceWithVote)
  })
  ctx.status = 200
  ctx.body = { resources: parsedResources }
}
