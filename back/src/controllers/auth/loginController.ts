import Koa from 'koa'
import { prisma } from '../../prisma/client'
import { appConfig } from '../../config/config'
import {
  ForbiddenError,
  InvalidCredentials,
  ValidationError,
} from '../../helpers/errors'

export const loginController = async (ctx: Koa.Context) => {
  const { dni, password } = ctx.request.body
  const dniUpperCase = dni.toUpperCase()
  const expirationInMilliseconds = 86400000
  const fetchSSO = await fetch(`${appConfig.ssoUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dni,
      password,
    }),
  })
  const data = await fetchSSO.json()
  if (fetchSSO.status === 401) {
    throw new InvalidCredentials()
  }
  if (fetchSSO.status !== 200) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new ValidationError(data.message)
  }
  const user = await prisma.user.findUnique({
    where: { dni: dniUpperCase as string },
    select: { id: true, status: true },
  })

  if (!user) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new InvalidCredentials()
  }

  if (user.status !== 'ACTIVE') {
    throw new ForbiddenError('Only active users can login')
  }

  ctx.cookies.set('authToken', data.authToken, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })
  ctx.cookies.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })

  ctx.status = 204
}
