import Koa from 'koa'
import { prisma } from '../../prisma/client'
import { ForbiddenError, InvalidCredentials } from '../../helpers/errors'
import { ssoHandler } from '../../helpers/sso/ssoHandler'

export const loginController = async (ctx: Koa.Context) => {
  const { dni, password } = ctx.request.body
  const expirationInMilliseconds = 86400000
  const { id, authToken, refreshToken } = await ssoHandler.login({
    dni,
    password,
  })

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, status: true },
  })

  if (!user) {
    throw new InvalidCredentials()
  }

  if (user.status !== 'ACTIVE') {
    throw new ForbiddenError('Only active users can login')
  }

  ctx.cookies.set('authToken', authToken, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })
  ctx.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })

  ctx.status = 204
}
