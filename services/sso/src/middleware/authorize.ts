import Koa from 'koa'
import { User, UserRole } from '../schemas'
import { ForbiddenError } from '../utils/errors'
import { checkRoleAccess } from '../utils/checkRoleAccess'

type Roles = keyof typeof UserRole
export const authorize =
  (requestedRole: Roles[]) => async (ctx: Koa.Context, next: Koa.Next) => {
    const { role } = ctx.state.user as Pick<User, 'id' | 'role'>
    if (!role) {
      throw new ForbiddenError()
    }

    const roleValues = requestedRole.map((r) => UserRole[r])
    const hasAccess = roleValues.some((roleValue) =>
      checkRoleAccess(roleValue, role)
    )

    if (!hasAccess) {
      throw new ForbiddenError()
    }

    await next()
  }
