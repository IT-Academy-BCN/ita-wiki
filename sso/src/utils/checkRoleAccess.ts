import { UserRole } from '../schemas'
import { ForbiddenError } from './errors'

const rolePoints = {
  [UserRole.ADMIN]: 100,
  [UserRole.MENTOR]: 50,
  [UserRole.REGISTERED]: 0,
}

export const checkRoleAccess = (requiredRole: UserRole, userRole: UserRole) => {
  const requiredRolePoints = rolePoints[requiredRole]
  const userRolePoints = rolePoints[userRole]

  if (requiredRolePoints > userRolePoints) {
    throw new ForbiddenError(`Access denied. You don't have permissions`)
  }
}
