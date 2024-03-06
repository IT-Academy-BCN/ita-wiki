import { Prisma, User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { TResourcesGetParamsSchema } from '../../schemas/resource/resourcesGetParamsSchema'
import {
  attachUserNamesToResources,
  markFavorites,
  transformResourceToAPI,
} from '../../helpers'

export const getResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User | null
  const {
    resourceTypes,
    topic: topicId,
    slug,
    status,
    search,
  } = ctx.query as TResourcesGetParamsSchema
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

  const resourcesWithUserName = await attachUserNamesToResources(resources)
  const resourcesWithFavorites = markFavorites(resourcesWithUserName, user)

  const parsedResources = resourcesWithFavorites.map((resource) =>
    resourceGetSchema.parse(
      transformResourceToAPI(resource, user ? user.id : undefined)
    )
  )

  ctx.status = 200
  ctx.body = parsedResources
}
