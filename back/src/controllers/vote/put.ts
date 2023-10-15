import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const putVote: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
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
      userId_resourceId: { userId: user.id, resourceId },
    },
    update: {
      vote: voteInt,
    },
    create: {
      userId: user.id,
      resourceId,
      vote: voteInt,
    },
  })

  ctx.status = 204
}
