import Koa from 'koa'
import { prisma } from '../../prisma/client'
import {
  ForbiddenError,
  InvalidCredentials,
  ValidationError,
} from '../../helpers/errors'
import { handleSSO } from '../../helpers/handleSso'

export const loginController = async (ctx: Koa.Context) => {
  const { dni, password } = ctx.request.body
  const expirationInMilliseconds = 86400000
  const fetchSSO = await handleSSO('login', { dni, password })
  if (fetchSSO.status === 401) {
    throw new InvalidCredentials()
  }
  if (fetchSSO.status !== 200) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new ValidationError(fetchSSO.data.message)
  }
  const user = await prisma.user.findUnique({
    where: { id: fetchSSO.data.id },
    select: { id: true, status: true },
  })

  if (!user) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new InvalidCredentials()
  }

  if (user.status !== 'ACTIVE') {
    throw new ForbiddenError('Only active users can login')
  }

  ctx.cookies.set('authToken', fetchSSO.data.authToken, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })
  ctx.cookies.set('refreshToken', fetchSSO.data.refreshToken, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })

  ctx.status = 204
}
