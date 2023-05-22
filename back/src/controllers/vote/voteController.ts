import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const getVote: Middleware = async (ctx: Koa.Context) => {
  const { resourceId } = ctx.params
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  })
  if (!resource) throw new NotFoundError('Resource not found')

  const upvote = await prisma.vote.count({
    where: {
      resourceId,
      vote: 1,
    },
  })
  const downvote = await prisma.vote.count({
    where: {
      resourceId,
      vote: -1,
    },
  })

  ctx.status = 200
  ctx.body = {
    voteCount: {
      upvote,
      downvote,
      total: upvote - downvote,
    },
  }
}

export const putVote: Middleware = async (ctx: Koa.Context) => {
  const { userId } = ctx.params
  const { resourceId, vote } = ctx.request.body

  let voteInt: number
  if (vote === 'up') {
    voteInt = 1
  } else if (vote === 'down') {
    voteInt = -1
  } else {
    voteInt = 0
  }

  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  })
  if (!resource) throw new NotFoundError('Resource not found')

  await prisma.vote.upsert({
    where: {
      userId_resourceId: { userId, resourceId },
    },
    update: {
      vote: voteInt,
    },
    create: {
      userId,
      resourceId,
      vote: voteInt,
    },
  })

  ctx.status = 204
}
