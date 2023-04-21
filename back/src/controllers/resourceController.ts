import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'

export const createResource: Middleware = async (ctx: Koa.Context) => {
  try {
    const resource = ctx.request.body

    resource.userId =
      (
        await prisma.user.findUnique({
          where: { email: resource.userEmail },
        })
      )?.id || ''

    delete resource.userEmail

    const topicIds = resource.topics
    delete resource.topics 

    const resourceDAO = await prisma.resource.create({ data: resource })

    await topicIds.forEach(async (topicId: string) => {
      await prisma.topicsOnResources.create({
        data: {
          topicId,
          resourceId: resourceDAO.id,
        }
      })
    })

    ctx.status = 204
  } catch (error) {
    ctx.status = 422
    ctx.body = { error: 'Invalid resource type' }
  }
}

export const getResourcesByUserId: Middleware = async (ctx: Koa.Context) => {
  const { userId } = ctx.params;
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      resources: true
    }
  })

  if(user === null){
    ctx.status = 404;
    ctx.body = { error: 'User not found'}
    return
  }

  ctx.status = 200;
  ctx.body = user.resources;
}
