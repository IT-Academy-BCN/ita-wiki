import Koa from 'koa'
import { checkRoleAccess, ssoHandler } from '../helpers'
import { UserRole } from '../schemas/users/userSchema'
import { UnauthorizedError } from '../helpers/errors'

export const authorize =
  (role: UserRole) => async (ctx: Koa.Context, next: Koa.Next) => {
    const authToken = ctx.cookies.get('authToken')
    if (!authToken) {
      throw new UnauthorizedError()
    }
    const data = await ssoHandler.getUser({ authToken })
    if (role) {
      checkRoleAccess(role, data.role)
    }
    await next()
  }
