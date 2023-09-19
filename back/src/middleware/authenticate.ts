import Koa from 'koa'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { prisma } from '../prisma/client'
import { NotFoundError, UnauthorizedError } from '../helpers/errors'

export const authenticate = async (ctx: Koa.Context, next: Koa.Next) => {
  const token = ctx.cookies.get('token')
  if (!token) throw new UnauthorizedError('Missing token')

  const { userId } = jwt.verify(
    token,
    process.env.JWT_KEY as Secret
  ) as JwtPayload

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) throw new NotFoundError('User not found')

  ctx.user = user
  await next()
}
