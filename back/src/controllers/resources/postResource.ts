import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import { User } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { MissingParamError } from '../../helpers/errors'

export const postResource: Middleware = async (ctx: Koa.Context) => {
  const { id: userId } = ctx.user as User
  const resource = ctx.request.body

  const slug = slugify(resource.title, { lower: true })
  const { categoryId } = resource as { categoryId: string }
  const topicIds: string[] = resource.topics

  if (topicIds.length === 0) throw new MissingParamError('topics')

  const databaseTopics = await prisma.topic.findMany({
    where: {
      id: {
        in: topicIds,
      },
    },
  })

  if (topicIds.length !== databaseTopics.length)
    throw new MissingParamError('valid topic/s')

  resource.topics = {
    create: resource.topics.map((topicId: string) => ({
      topic: {
        connect: {
          id: topicId,
        },
      },
    })),
  }

  await prisma.resource.create({
    data: { ...resource, userId, categoryId, slug },
  })

  ctx.status = 204
}
