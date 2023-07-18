import { USER_ROLE } from '@prisma/client'
import { ForbiddenError } from './errors'

const rolePoints = {
  [USER_ROLE.ADMIN]: 100,
  [USER_ROLE.MENTOR]: 50,
  [USER_ROLE.REGISTERED]: 0,
}

export const checkRoleAccess = (
  requiredRole: USER_ROLE,
  userRole: USER_ROLE
) => {
  const requiredRolePoints = rolePoints[requiredRole]
  const userRolePoints = rolePoints[userRole]

  if (requiredRolePoints > userRolePoints) {
    throw new ForbiddenError(`Access denied. You don't have permissions`)
  }
}
