import Koa from 'koa'
import { NotFoundError, UnauthorizedError } from '../helpers/errors'
import { ssoHandler } from '../helpers'
import db from '../db/knex'

export const authenticate = async (ctx: Koa.Context, next: Koa.Next) => {
  const authToken = ctx.cookies.get('authToken')
  if (!authToken) {
    throw new UnauthorizedError()
  }
  const { id } = await ssoHandler.validate(ctx, { authToken })
  const user = await db('user').where({ id }).first()

  if (!user) throw new NotFoundError('User not found')

  ctx.user = {
    id: user?.id,
    updatedAt: user?.updated_at,
    createdAt: user?.created_at,
  }
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
    const { id } = await ssoHandler.validate(ctx, { authToken })

    const user = await db('user').where({ id }).first()
    ctx.user = {
      id: user?.id,
      updatedAt: user?.updated_at,
      createdAt: user?.created_at,
    }
  }
  await next()
}
