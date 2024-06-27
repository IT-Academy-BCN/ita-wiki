import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import {
  attachUserNamesToResources,
  markFavorites,
  transformResourceToAPI,
} from '../../helpers'
import { ExtendedFavoriteResourceWithName } from '../../helpers/markFavorites'

export const getResourcesByUserId: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const categorySlug = ctx.query.categorySlug as string | undefined

  let resources = []

  const include = {
    vote: { select: { vote: true, userId: true } },
    topics: { select: { topic: true } },
    favorites: {
      where: { userId: user ? user.id : undefined },
    },
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
        user: { id: { equals: user.id } },
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
    resourceGetSchema.parse(transformResourceToAPI(resource, user.id))
  )

  ctx.status = 200
  ctx.body = parsedResources
}
