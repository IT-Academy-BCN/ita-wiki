import Koa, { Middleware } from 'koa'
import { User } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { NotFoundError } from '../../helpers/errors'
import {
  attachUserNamesToResources,
  transformResourceToAPI,
} from '../../helpers'

export const getResourcesById: Middleware = async (ctx: Koa.Context) => {
  const resourceId = ctx.params.id

  const user = ctx.user as User | null
  const voteSelect =
    ctx.user !== null ? { userId: true, vote: true } : { vote: true }

  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    include: {
      vote: { select: voteSelect },
      topics: { select: { topic: true } },
    },
  })
  if (!resource) throw new NotFoundError('Resource not found')

  const usersWithName = await attachUserNamesToResources([resource])

  const resourceWithVote = transformResourceToAPI(
    usersWithName[0],
    user ? user.id : undefined
  )
  const parsedResource = resourceGetSchema.parse(resourceWithVote)
  ctx.status = 200
  ctx.body = parsedResource
}
