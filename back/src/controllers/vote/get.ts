import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'
import { calculateVoteCount } from '../../helpers/transformResourceToAPI'

export const getVote: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const { resourceId } = ctx.params

  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    select: {
      id: true,
    },
  })
  if (!resource) throw new NotFoundError('Resource not found')

  const votes = await prisma.vote.findMany({
    where: {
      resourceId,
    },
  })

  const voteCount = calculateVoteCount(votes, user ? user.id : undefined)
  ctx.status = 200
  ctx.body = voteCount
}
