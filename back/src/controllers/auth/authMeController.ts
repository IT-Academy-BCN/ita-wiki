import { Middleware, Context } from 'koa'

import { prisma } from '../../prisma/client'
import { userGetSchema } from '../../schemas'

export const authMeController: Middleware = async (ctx: Context) => {
  const { id } = ctx.user

  const data = await prisma.user.findUnique({
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
  ctx.body = userGetSchema.parse(data)
}
