import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { resourceFavoriteSchema } from '../../schemas'
import {
  attachUserNamesToResources,
  transformResourceToAPI,
} from '../../helpers'

export const getFavoriteResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User

  const { categorySlug } = ctx.params

  const resources = await prisma.resource.findMany({
    where: {
      favorites: { some: { userId: user.id } },
      category: { slug: categorySlug },
    },
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
      user: {
        select: {
          avatarId: true,
        },
      },
    },
  })

  const resourcesWithUserName = await attachUserNamesToResources(resources)

  const resourcesWithIsAuthor = resourcesWithUserName.map((resource) => {
    const isAuthor = resource.userId === user.id
    return { ...resource, isAuthor }
  })

  const parsedResources = resourcesWithIsAuthor.map((resource) =>
    resourceFavoriteSchema.parse({
      ...transformResourceToAPI(resource, user ? user.id : undefined),
      isAuthor: resource.isAuthor,
    })
  )

  ctx.status = 200
  ctx.body = parsedResources
}
