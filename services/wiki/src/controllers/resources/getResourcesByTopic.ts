import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { MissingParamError, NotFoundError } from '../../helpers/errors'
import { resourceGetSchema } from '../../schemas'
import {
  attachUserNamesToResources,
  transformResourceToAPI,
} from '../../helpers'

export const getResourcesByTopicId: Middleware = async (ctx: Koa.Context) => {
  const { topicId } = ctx.params

  if (!topicId) throw new MissingParamError('topicId')

  const topicFound = await prisma.topic.findUnique({
    where: {
      id: topicId,
    },
  })

  if (!topicFound) throw new NotFoundError('Topic not found')

  const resourcesList = await prisma.resource.findMany({
    where: {
      topics: {
        some: {
          topicId,
        },
      },
    },
    include: {
      vote: { select: { vote: true } },
      topics: { select: { topic: true } },
    },
  })

  const resourcesWithUserName = await attachUserNamesToResources(resourcesList)
  const parsedResources = resourcesWithUserName.map((resource) => {
    const resourceWithVote = transformResourceToAPI(resource)
    return resourceGetSchema.parse(resourceWithVote)
  })

  ctx.status = 200
  ctx.body = { resources: parsedResources }
}

export const getResourcesByTopicSlug: Middleware = async (ctx: Koa.Context) => {
  const { slug } = ctx.params

  if (!slug) throw new MissingParamError('slug')

  const slugFound = await prisma.topic.findUnique({ where: { slug } })

  if (!slugFound) throw new NotFoundError('Topic not found')

  const resourcesList = await prisma.resource.findMany({
    where: {
      topics: {
        some: {
          topic: {
            slug,
          },
        },
      },
    },
    include: {
      vote: { select: { vote: true } },
      topics: { select: { topic: true } },
    },
  })

  const resourcesWithUserName = await attachUserNamesToResources(resourcesList)
  const parsedResources = resourcesWithUserName.map((resource) => {
    const resourceWithVote = transformResourceToAPI(resource)
    return resourceGetSchema.parse(resourceWithVote)
  })

  ctx.status = 200
  ctx.body = { resources: parsedResources }
}
