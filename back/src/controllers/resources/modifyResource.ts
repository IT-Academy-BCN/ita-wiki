import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'

export const modifyResource: Middleware = async (ctx: Koa.Context) => {
    const newData = ctx.request.body
    // {id, title, description, url, topic, resourceType, userId }
    console.log(newData)

    if (newData.title) {
        await prisma.resource.update({
            where: { id: newData.id },
            data: {
                title: newData.title
            }
        })
    }
    if (newData.description) {
        await prisma.resource.update({
            where: { id: newData.id },
            data: {
                description: newData.description
            }
        })
    }
    if (newData.url) {
        await prisma.resource.update({
            where: { id: newData.id },
            data: {
                url: newData.url
            }
        })
    }
    // if (newData.topic) {
    //     await prisma.topicsOnResources.update({
    //         where: { topicId_resourceId: newData.id },
    //         connect: {
    //             data: { topic: newData.topic }
    //         }
    //     })
    // }
    if (newData.resourceType) {
        await prisma.resource.update({
            where: { id: newData.id },
            data: {
                resourceType: newData.resourceType
            }
        })
    }

    ctx.status = 204

}