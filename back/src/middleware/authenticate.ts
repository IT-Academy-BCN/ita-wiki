import Koa from 'koa'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { prisma } from '../prisma/client'
import { NotFoundError } from '../helpers/errors'

export const authenticate = async (ctx: Koa.Context, next: Koa.Next) => {
  const token = ctx.cookies.get('token')
  if (!token) {
    ctx.status = 401
    ctx.body = { error: 'Unauthorized: Missing token' }
    return
  }

  const { userId } = jwt.verify(
    token,
    process.env.JWT_KEY as Secret
  ) as JwtPayload

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) throw new NotFoundError('User not found')

  ctx.user = user
  await next()
}
