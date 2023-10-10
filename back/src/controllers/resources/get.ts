import Koa, { Middleware } from 'koa'
import qs from 'qs'
import { Prisma, RESOURCE_TYPE, RESOURCE_STATUS, User } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { transformResourceToAPI } from '../../helpers/transformResourceToAPI'
import { resourceGetSchema } from '../../schemas'

export const getResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User | null
  const parsedQuery = qs.parse(ctx.querystring, { ignoreQueryPrefix: true })
  const {
    resourceTypes,
    topic: topicId,
    slug,
    status,
  } = parsedQuery as {
    resourceTypes?: (keyof typeof RESOURCE_TYPE)[]
    topic?: string
    slug?: string
    status?: (keyof typeof RESOURCE_STATUS)[]
  }

  const where: Prisma.ResourceWhereInput = {
    topics: {
      some: {
        topic: { category: { slug }, id: topicId },
      },
    },
    resourceType: { in: resourceTypes },
    status: { in: status },
  }
  const voteSelect =
    ctx.user !== null ? { userId: true, vote: true } : { vote: true }

  const include = {
    user: {
      select: {
        name: true,
      },
    },
    vote: { select: voteSelect },
    topics: { select: { topic: true } },
  }

  const resources = await prisma.resource.findMany({
    where,
    include,
  })

  const userFavorites = await prisma.favorites.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      resource: {
        select: {
          id: true,
        },
      },
    },
  })

  const resourcesWithFavorites = resources.map((resource) => {
    const isFavorite = !!userFavorites.find(
      (favorite) => favorite.resourceId === resource.id
    )

    return {
      ...resource,
      isFavorite,
    }
  })

  const parsedResources = resourcesWithFavorites.map((resource) =>
    resourceGetSchema.parse(
      transformResourceToAPI(resource, user ? user.id : undefined)
    )
  )

  ctx.status = 200
  ctx.body = parsedResources
}
