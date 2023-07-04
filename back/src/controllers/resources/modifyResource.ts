import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { DefaultError } from '../../helpers/errors'

export const modifyResource: Middleware = async (ctx: Koa.Context) => {
    const newData = ctx.request.body
    const userId = ctx.params

    const resource = await prisma.resource.findFirst({
        where: { id: newData.id }
    })

    if (!resource || resource!.userId !== userId) {
        throw new DefaultError(401, 'Only resource owner can modify resource')
    }

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
    if (newData.topic) {
        await prisma.topicsOnResources.deleteMany({
            where: { resourceId: newData.resourceId }
        })

        await prisma.topicsOnResources.create({
            data: {
                resourceId: newData.resourceId,
                topicId: newData.topicId
            }
        })
    }
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