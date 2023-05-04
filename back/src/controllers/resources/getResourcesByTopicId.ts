import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'
import { MissingParamError } from '../helpers/errors'

export const getResourcesByTopicId: Middleware = async (ctx: Koa.Context) => {
  
    const {topicId} = ctx.params;
  
    if(!topicId) throw new MissingParamError('topicId')
  
    const resourcesList = await prisma.resource.findMany({
      where: { 
        topics: { 
          some: { 
            topicId 
          } 
      }
    },
    select: {
    id: true,
    title: true,
  }
  });
  
    ctx.status = 200;
    ctx.body = resourcesList
  
  }
  