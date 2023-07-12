import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import { prisma } from '../../prisma/client'

export const createTopic: Middleware = async (ctx: Koa.Context) => {
  const topic = ctx.request.body

  const slug = slugify(topic.name, { lower: true })

  await prisma.topic.create({
    data: { ...topic, slug },
  })

  ctx.status = 204
}
