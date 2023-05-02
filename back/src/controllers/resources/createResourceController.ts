import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'

export const createResource: Middleware = async (ctx: Koa.Context) => {
  const resource = ctx.request.body
  
  resource.userId =
  (
    await prisma.user.findUnique({
      where: { email: resource.userEmail },
    })
    )?.id || null
    
    delete resource.userEmail
    
    if(!resource.userId) {
      ctx.status = 422
      ctx.body = { error: 'Invalid email' }
      return
    }
    
    const topicIds = resource.topics
    delete resource.topics

    if(topicIds.length === 0) {
      ctx.status = 422
      ctx.body = { error: 'Must contain at least one topic' }
      return
    }
    
    const resourceId = (await prisma.resource.create({ data: resource })).id

    await topicIds.forEach(async (topicId: string) => {
      await prisma.topicsOnResources.create({
        data: {
          topicId,
          resourceId
        }
      })
    })

    ctx.status = 204
}
