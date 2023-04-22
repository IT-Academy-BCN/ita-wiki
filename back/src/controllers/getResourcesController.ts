import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'

export const getResources: Middleware = async (ctx: Koa.Context) => {
    const { type, category, topic } = ctx.query
    
    if(category && topic){
      ctx.status = 422
      ctx.body = {
        error: 'Category and topic are mutually exclusive'
      }
      return
    }

    const where = {}
    if (type)
      // @ts-ignore
      where.type = { equals: type }
    if (category)
      // @ts-ignore
      where.category = { equals: category }
    if (topic)
      // @ts-ignore
      where.topic = { equals: topic }
  
    const resources = await prisma.resource
      .findMany({
        where,
        include: {
          topics: true,
          user: true,
        },
      })
      
  
    ctx.status = 200
    ctx.body = { resources }
  }
  