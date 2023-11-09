import Koa, { Middleware } from 'koa'
import qs from 'qs'
import { Prisma, RESOURCE_TYPE, User } from '@prisma/client'
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
    status?: 'SEEN' | 'NOT_SEEN'
  }
  let statusCondition: Prisma.Enumerable<Prisma.ResourceWhereInput> = {}
  if (user && status) {
    const viewedFilter = { userId: user.id }
    if (status === 'SEEN') {
      statusCondition = { AND: { viewed: { some: viewedFilter } } }
    } else if (status === 'NOT_SEEN') {
      statusCondition = { NOT: { viewed: { some: viewedFilter } } }
    }
  }
  const where: Prisma.ResourceWhereInput = {
    topics: {
      some: {
        topic: { category: { slug }, id: topicId },
      },
    },
    resourceType: { in: resourceTypes },
    ...statusCondition,
  }
  const voteSelect =
    ctx.user !== null ? { userId: true, vote: true } : { vote: true }

  const resources = await prisma.resource.findMany({
    where,
    include: {
      user: {
        select: {
          name: true,
        },
      },
      vote: { select: voteSelect },
      topics: { select: { topic: true } },
      favorites: {
        where: { userId: user ? user.id : undefined },
      },
    },
  })

  const resourcesWithFavorites = resources.map((resource) => {
    let isFavorite: boolean = false
    if (user !== null)
      isFavorite = !!resource.favorites.find(
        (favorite) => favorite.userId === user.id
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
