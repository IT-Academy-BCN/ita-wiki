import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'

export const getTopics: Middleware = async (ctx: Koa.Context) => {
    const topics = await prisma.topic.findMany({
        select: {
            id: true,
            name: true,
        }
    });
    ctx.status = 200;
    ctx.body = topics;
}

export const getTopicsByCategoryId: Middleware = async (ctx: Koa.Context) => {
    const {categoryId} = ctx.params;
    const topics = await prisma.topic.findMany({
        where: {
            categoryId
        },
        select: {
            id: true,
            name: true,
        }
    });
    ctx.status = 200;
    ctx.body = topics;
}