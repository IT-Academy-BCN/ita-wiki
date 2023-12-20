import { Middleware, Context } from 'koa'

import { prisma } from '../../prisma/client'
import { handleSSO } from '../../helpers/handleSso'

export const authMeController: Middleware = async (ctx: Context) => {
  const { id } = ctx.user
  const authToken = ctx.cookies.get('authToken') as string
  const fetchSSO = await handleSSO('getUser', { authToken })
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      role: true,
      status: true,
      avatarId: true,
    },
  })

  ctx.status = 200
  ctx.body = { ...user, ...fetchSSO.data }
}
