import { userManager } from '../db/managers/userManager'
import { UserStatus } from '../schemas/users/userSchema'
import { InvalidCredentials, ForbiddenError } from './errors'
import { KeyType, verifyToken } from './jwtAuth'

export const validateUserAndToken = async (
  keyType: KeyType,
  token?: string
) => {
  if (!token) throw new InvalidCredentials()
  const { id } = verifyToken(token, keyType)
  const user = await userManager.getUser(id, {
    fields: ['id', 'role', 'status'],
  })
  if (!user) {
    throw new InvalidCredentials()
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new ForbiddenError('The user is Blocked')
  }
  if (user.status !== UserStatus.ACTIVE) {
    throw new ForbiddenError('Only active users can proceed')
  }
  return user
}
