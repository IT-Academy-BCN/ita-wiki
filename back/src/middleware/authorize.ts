import Koa from 'koa'
import { User, USER_ROLE } from '@prisma/client'
import { checkRoleAccess } from '../helpers'

export const authorize =
  (role: USER_ROLE) => async (ctx: Koa.Context, next: Koa.Next) => {
    const user = ctx.user as User

    if (role) {
      checkRoleAccess(role, user.role)
    }
    await next()
  }
