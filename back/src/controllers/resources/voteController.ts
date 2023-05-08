import Koa, { Middleware } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from "../../prisma/client"
import { NotFoundError } from '../../helpers/errors'

export const getResourceVote: Middleware = async (ctx: Koa.Context) => {
    const { resourceId } = ctx.params

    const resource = await prisma.resource.findUnique({
        where: { id: resourceId }
    })

    if(!resource) throw new NotFoundError('Resource not found')

    const upvote = await prisma.vote.count({
        where: {
            resourceId,
            vote: 1
        }
    })

    const downvote = await prisma.vote.count({
        where: {
            resourceId,
            vote: -1
        }
    })

    ctx.status = 200;
    ctx.body = { voteCount: {
        upvote,
        downvote,
        total: (upvote-downvote)
    } }

    /* const res = await prisma.vote.groupBy({
        by: ['vote'],
        where: {
            resourceId,
            vote: {not: 0},
        },
        _sum: {vote: true}
    }) 
    ctx.body = res; */
}

export const putResourceVote: Middleware = async (ctx: Koa.Context) => {
  
    const token = ctx.cookies.get('token') as string
    const { userId } = jwt.verify(token, process.env.JWT_KEY as Secret) as { userId: string }
    const { resourceId, vote } = ctx.params

    const voteInt = parseInt(vote, 10)

    const resource = await prisma.resource.findUnique({
        where: { id: resourceId }
    })

    if(!resource) throw new NotFoundError('Resource not found')

    await prisma.vote.upsert({
        where: {
            userId_resourceId: { userId, resourceId }
        },
        update: {
            vote: voteInt
        },
        create: {
            userId,
            resourceId,
            vote: voteInt
        }
    })

    ctx.status = 204;
}