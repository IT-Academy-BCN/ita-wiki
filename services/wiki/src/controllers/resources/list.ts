import { Prisma, User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { TResourcesListParamsSchema } from '../../schemas/resource/resourcesListParamsSchema'
import {
  attachUserNamesToResources,
  markFavorites,
  transformResourceToAPI,
  ExtendedFavoriteResourceWithName,
} from '../../helpers'

export const listResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User | null
  const {
    resourceTypes,
    topic: topicId,
    categorySlug,
    topicSlug,
    status,
    search,
  } = ctx.query as TResourcesListParamsSchema
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
        topic: {
          category: { slug: categorySlug },
          id: topicId,
          slug: topicSlug,
        },
      },
    },
    resourceType: { in: resourceTypes },
    ...statusCondition,
    ...(search &&
      search.trim().length >= 2 && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
  }
  const voteSelect =
    ctx.user !== null ? { userId: true, vote: true } : { vote: true }

  const resources = await prisma.resource.findMany({
    where,
    include: {
      vote: { select: voteSelect },
      topics: { select: { topic: true } },
      favorites: {
        where: { userId: user ? user.id : undefined },
      },
    },
  })

  if (resources.length === 0) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const resourcesWithUserName = await attachUserNamesToResources(resources)
  const resourcesWithFavorites = markFavorites(
    resourcesWithUserName.filter(
      (resource): resource is ExtendedFavoriteResourceWithName =>
        'favorites' in resource
    ),
    user
  )

  const parsedResources = resourcesWithFavorites.map((resource) =>
    resourceGetSchema.parse(
      transformResourceToAPI(resource, user ? user.id : undefined)
    )
  )

  ctx.status = 200
  ctx.body = parsedResources
}
