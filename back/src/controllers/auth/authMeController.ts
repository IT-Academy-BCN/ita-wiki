import { Middleware, Context } from 'koa'

import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const authMeController: Middleware = async (ctx: Context) => {
  const { id } = ctx.user

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      dni: true,
      email: true,
      role: true,
      status: true,
      avatarId: true,
    },
  })

  ctx.status = 200
  ctx.body = userAvatar ? userWithAvatar : user
}
