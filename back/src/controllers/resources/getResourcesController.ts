import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'

export const getResources: Middleware = async (ctx: Koa.Context) => {
  const { type, topic } = ctx.query

  const where = {}
  if (type)
    // @ts-ignore
    where.resourceType = { equals: type }
  if (topic)
    // @ts-ignore
    where.topics = { some: { topic: { name: topic } } }

  const resourcesDAO = await prisma.resource.findMany({
    where,
    include: {
      topics: true,
      user: true,
    },
  })

  // `include topics: true` only maps to relational table info
  // we also need to produce data for consumption
  const resources = await Promise.all(
    resourcesDAO.map(async (r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      url: r.url,
      resourceType: r.resourceType,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      userEmail: r.user.email,
      topics: await Promise.all(r.topics.map(
        async (t) =>
          await prisma.topic.findUnique({
            where: { id: t.topicId }
          })
      )),
    }))
  )

  ctx.status = 200
  ctx.body = { resources }
}
