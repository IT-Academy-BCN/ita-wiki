import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { transformResourceToAPI } from '../../helpers/transformResourceToAPI'
import { resourceGetSchema } from '../../schemas'

export const getResourcesByUserId: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const categorySlug = ctx.query.categorySlug as string | undefined

  let resources = []

  const include = {
    user: {
      select: {
        name: true,
      },
    },
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
    resourceGetSchema.parse(transformResourceToAPI(resource, user.id))
  )

  ctx.status = 200
  ctx.body = parsedResources
}
