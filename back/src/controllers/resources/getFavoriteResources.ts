import Koa, { Middleware } from 'koa'
import { User } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { transformResourceToAPI } from '../../helpers/transformResourceToAPI'
import { resourceFavoriteSchema } from '../../schemas'

export const getFavoriteResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User

  const { categorySlug } = ctx.params
  const where = {
    userId: user.id,
    resource: categorySlug ? { category: { slug: categorySlug } } : {},
  }

  const favorites = await prisma.favorites.findMany({
    where,
    select: {
      resource: {
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          url: true,
          resourceType: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          categoryId: true,
          topics: { select: { topic: true } },
          vote: { select: { vote: true, userId: true } },
        },
      },
      user: {
        select: {
          name: true,
          avatarId: true,
        },
      },
    },
  })

  // console.log('favorites: ', favorites)

  const favoritesWithIsAuthor = favorites.map((fav) => {
    const isAuthor = fav.resource.userId === user.id
    return { ...fav, resource: { ...fav.resource, isAuthor } }
  })

  const parsedResources = favoritesWithIsAuthor.map((resource) =>
    resourceFavoriteSchema.parse({
      ...transformResourceToAPI(resource.resource, user ? user.id : undefined),
      user: {
        name: resource.user.name,
        avatarId: resource.user.avatarId,
      },
      isAuthor: resource.resource.isAuthor,
    })
  )

  ctx.status = 200
  ctx.body = parsedResources
}
