import { Middleware, Context } from 'koa'

import { prisma } from '../../prisma/client'
import { ssoHandler } from '../../helpers'

export const authMeController: Middleware = async (ctx: Context) => {
  const { id } = ctx.user
  const authToken = ctx.cookies.get('authToken') as string
  const data = await ssoHandler.getMeUsers({ authToken })
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
    },
  })

  ctx.status = 200
  ctx.body = { ...user, ...data }
}
