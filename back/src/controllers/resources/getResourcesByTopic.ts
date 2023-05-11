import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { MissingParamError, NotFoundError } from '../../helpers/errors'

export const getResourcesByTopicId: Middleware = async (ctx: Koa.Context) => {
  
    const { topicId } = ctx.params;
  
    if(!topicId) throw new MissingParamError('topicId');
    
    const topicFound = await prisma.topic.findUnique({
      where: {
        id: topicId
      },
    });

    if(!topicFound) throw new NotFoundError('Topic not found');
  
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

export const getResourcesByTopicSlug: Middleware = async (ctx: Koa.Context) => {
  
  const { slug } = ctx.params;
  
  if(!slug) throw new MissingParamError('slug');
    
  const slugFound = await prisma.topic.findUnique({ where: { slug }}); 

  if(!slugFound) throw new NotFoundError('Topic not found');

  const resourcesList = await prisma.resource.findMany({
    where: {
      topics: {
        some: {
          topic: {
            slug
          }
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