import Koa, { Middleware } from 'koa'
import { User } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { transformResourceToAPI } from '../../helpers/transformResourceToAPI'
import { resourceFavoriteSchema } from '../../schemas'

export const getFavoriteResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const { categorySlug } = ctx.params
  let where: {}

  if (categorySlug) {
    where = {
      userId: user.id,
      resource: { category: { slug: categorySlug } },
    }
  } else {
    where = {
      userId: user.id,
      resource: {},
    }
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
          createdAt: true,
          updatedAt: true,
          userId: true,
          categoryId: true,
          topics: true,
          vote: { select: { vote: true } },
        },
      },
    },
  })

  const parsedResources = favorites.map((resource) => {
    const resourceWithVote = transformResourceToAPI(resource.resource)
    return resourceFavoriteSchema.parse(resourceWithVote)
  })

  ctx.status = 200
  ctx.body = parsedResources
}
