import Koa from 'koa'
import { User, UserRole } from '../schemas'
import { ForbiddenError } from '../utils/errors'
import { checkRoleAccess } from '../utils/checkRoleAccess'

export const authorize =
  (requestedRole: UserRole) => async (ctx: Koa.Context, next: Koa.Next) => {
    const { role } = ctx.state.user as Pick<User, 'id' | 'role'>
    if (!role) {
      throw new ForbiddenError()
    }
    checkRoleAccess(requestedRole, role)
    await next()
  }
