import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const deleteResource: Middleware = async (ctx: Koa.Context) => {
    const newData = ctx.request.body
    // {resourceId,  userId }

    const resourceToDelete = await prisma.resource.findFirst({
        where: {
            id: newData.id,
            userId: newData.userId
        }
    })
    if (!resourceToDelete) {
        throw new NotFoundError()
    }
    await prisma.topicsOnResources.deleteMany({
        where: { resourceId: newData.id }
    })
    await prisma.resource.deleteMany({
        where: {
            id: newData.id,
            userId: newData.userId
        }
    })

    ctx.status = 204

}