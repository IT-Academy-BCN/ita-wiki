import Koa, { Middleware } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import slugify from 'slugify'
import { prisma } from '../../prisma/client'
import { MissingParamError } from '../../helpers/errors'

export const createResource: Middleware = async (ctx: Koa.Context) => {
  const token = ctx.cookies.get('token') as string
  const { userId } = jwt.verify(token, process.env.JWT_KEY as Secret) as { userId: string }
  const resource = ctx.request.body

  const slug = slugify(resource.title, { lower: true })

  const topicIds = resource.topics
  delete resource.topics
  if (topicIds.length === 0) throw new MissingParamError('Must contain at least one topic')

  const resourceId = await prisma.resource.create({
    data: { ...resource, userId, slug },
  })

  await prisma.topicsOnResources.createMany({
    data: topicIds.map((topicId: string) => ({
      topicId,
      resourceId: resourceId.id,
    })),
  })

  ctx.status = 204
}