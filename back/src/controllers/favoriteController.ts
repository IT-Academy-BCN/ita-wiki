import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'

export const getUserFavoriteResources: Middleware = async (ctx: Koa.Context) => {
    const { userId } = ctx.params;
    const favorites = await prisma.favorites.findMany({
        where: {
            userId
        },
        select: {
            user: true,
            resource: {
                select: {
                    title: true,
                }
            }
        }
    });
    ctx.status = 200;
    ctx.body = favorites;
}