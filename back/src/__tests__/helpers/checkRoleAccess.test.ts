import { USER_ROLE } from '@prisma/client'
import { test, describe, expect } from 'vitest'
import { ForbiddenError } from '../../helpers/errors'
import { checkRoleAccess } from '../../helpers'

describe('tests checkRoleAccess function', () => {
  test('should not throw error when user has required access level', () => {
    const requiredRole = USER_ROLE.MENTOR
    const userRole = USER_ROLE.ADMIN
    expect(() => {
      checkRoleAccess(requiredRole, userRole)
    }).not.toThrow()
  })

  test('should throw ForbiddenError when user does not have required access level', () => {
    const requiredRole = USER_ROLE.MENTOR
    const userRole = USER_ROLE.REGISTERED
    expect(() => {
      checkRoleAccess(requiredRole, userRole)
    }).toThrow(ForbiddenError)
  })
})
