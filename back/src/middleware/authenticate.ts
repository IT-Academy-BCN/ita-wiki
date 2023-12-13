import Koa from 'koa'
import { prisma } from '../prisma/client'
import {
  InvalidToken,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/errors'
import { appConfig } from '../config/config'

export const authenticate = async (ctx: Koa.Context, next: Koa.Next) => {
  const authToken = ctx.cookies.get('authToken')
  if (!authToken) {
    throw new UnauthorizedError()
  }
  const fetchSSO = await fetch(`${appConfig.ssoUrl}/api/v1/tokens/validate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ authToken }),
  })
  const data = await fetchSSO.json()
  if (fetchSSO.status !== 200) {
    ctx.cookies.set('authToken', null, {
      expires: new Date(0),
      overwrite: true,
    })
    throw new InvalidToken()
  }
  const user = await prisma.user.findUnique({ where: { id: data.id } })

  if (!user) throw new NotFoundError('User not found')

  ctx.user = user
  await next()
}

/**
 * Extracts a user from a token and sets it in the context.
 * Unlike the authenticate middleware, it doesn't throw errors
 * for invalid tokens or non-existent users because it's used in
 * controllers that don't require authentication.
 */
export const getUserFromToken = async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.user = null
  const authToken = ctx.cookies.get('authToken')
  if (authToken) {
    const fetchSSO = await fetch(`${appConfig.ssoUrl}/api/v1/tokens/validate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authToken }),
    })
    const data = await fetchSSO.json()
    if (fetchSSO.status !== 200) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      ctx.cookies.set('authToken', null, {
        expires: new Date(0),
        overwrite: true,
      })
      throw new InvalidToken()
    }
    const user = await prisma.user.findUnique({ where: { id: data.id } })
    ctx.user = user
  }
  await next()
}
