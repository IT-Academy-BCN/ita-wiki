import { test, describe, expect } from 'vitest'
import { ForbiddenError } from '../../helpers/errors'
import { checkRoleAccess } from '../../helpers'
import { UserRole } from '../../schemas/users/userSchema'

describe('tests checkRoleAccess function', () => {
  test('should not throw error when user has required access level', () => {
    const requiredRole = UserRole.MENTOR
    const userRole = UserRole.ADMIN
    expect(() => {
      checkRoleAccess(requiredRole, userRole)
    }).not.toThrow()
  })

  test('should throw ForbiddenError when user does not have required access level', () => {
    const requiredRole = UserRole.MENTOR
    const userRole = UserRole.REGISTERED
    expect(() => {
      checkRoleAccess(requiredRole, userRole)
    }).toThrow(ForbiddenError)
  })
})
