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

  const resources = await prisma.resource.findMany({
    where,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      url: true,
      resourceType: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      topics: {
        select: {
          topic: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })

  ctx.status = 200
  ctx.body = { resources }
}
