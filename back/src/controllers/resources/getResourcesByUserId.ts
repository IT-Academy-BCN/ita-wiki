import Koa, { Middleware } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from '../../prisma/client'

export const getResourcesByUserId: Middleware = async (ctx: Koa.Context) => {
  const token = ctx.cookies.get('token') as string
  const { userId } = jwt.verify(token, process.env.JWT_KEY as Secret) as {
    userId: string
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      resources: true,
    },
  })

  if (user === null) {
    ctx.status = 404
    ctx.body = { error: 'User not found' }
    return
  }

  ctx.status = 200
  ctx.body = user.resources
}
