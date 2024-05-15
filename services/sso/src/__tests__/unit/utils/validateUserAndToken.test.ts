import { describe, it, expect, vi, afterEach } from 'vitest'
import { userManager } from '../../../db/managers/userManager'
import { UserRole, UserStatus } from '../../../schemas/users/userSchema'
import { validateUserAndToken } from '../../../utils/authHelper'
import { InvalidCredentials, ForbiddenError } from '../../../utils/errors'
import { verifyToken } from '../../../utils/jwtAuth'

vi.mock('../../../db/managers/userManager', () => ({
  userManager: {
    getUser: vi.fn(),
  },
}))

vi.mock('../../../utils/jwtAuth', () => ({
  verifyToken: vi.fn(),
}))

describe('validateUserAndToken', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should throw InvalidCredentials if no token is provided', async () => {
    await expect(validateUserAndToken('auth')).rejects.toThrow(
      InvalidCredentials
    )
  })

  it('should throw InvalidCredentials if the token is invalid', async () => {
    vi.mocked(verifyToken).mockImplementation(() => {
      throw new Error('Invalid token')
    })

    await expect(validateUserAndToken('auth', 'invalidToken')).rejects.toThrow(
      Error
    )
    expect(verifyToken).toHaveBeenCalledWith('invalidToken', 'auth')
  })

  it('should throw InvalidCredentials if the user is not found', async () => {
    vi.mocked(verifyToken).mockReturnValue({ id: 'user1' })
    vi.mocked(userManager.getUser).mockResolvedValue(null)

    await expect(validateUserAndToken('auth', 'validToken')).rejects.toThrow(
      InvalidCredentials
    )
    expect(verifyToken).toHaveBeenCalledWith('validToken', 'auth')
    expect(userManager.getUser).toHaveBeenCalledWith('user1', {
      fields: ['id', 'role', 'status'],
    })
  })

  it('should throw ForbiddenError if the user is blocked', async () => {
    const blockedUser = {
      id: 'user1',
      role: UserRole.ADMIN,
      status: UserStatus.BLOCKED,
      dni: '123456',
      password: 'password',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      deletedAt: null,
      itineraryId: 'itinerary1',
    }
    vi.mocked(verifyToken).mockReturnValue({ id: 'user1' })
    vi.mocked(userManager.getUser).mockResolvedValue(blockedUser)

    await expect(validateUserAndToken('auth', 'validToken')).rejects.toThrow(
      ForbiddenError
    )
    expect(verifyToken).toHaveBeenCalledWith('validToken', 'auth')
    expect(userManager.getUser).toHaveBeenCalledWith('user1', {
      fields: ['id', 'role', 'status'],
    })
  })

  it('should throw ForbiddenError if the user is not active', async () => {
    const inactiveUser = {
      id: 'user1',
      role: UserRole.ADMIN,
      status: UserStatus.PENDING,
      dni: '123456',
      password: 'password',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      deletedAt: null,
      itineraryId: 'itinerary1',
    }
    vi.mocked(verifyToken).mockReturnValue({ id: 'user1' })
    vi.mocked(userManager.getUser).mockResolvedValue(inactiveUser)

    await expect(validateUserAndToken('auth', 'validToken')).rejects.toThrow(
      ForbiddenError
    )
    expect(verifyToken).toHaveBeenCalledWith('validToken', 'auth')
    expect(userManager.getUser).toHaveBeenCalledWith('user1', {
      fields: ['id', 'role', 'status'],
    })
  })

  it('should return the user if the token is valid and the user is active', async () => {
    const activeUser = {
      id: 'user1',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      dni: '123456',
      password: 'password',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      deletedAt: null,
      itineraryId: 'itinerary1',
    }
    vi.mocked(verifyToken).mockReturnValue({ id: 'user1' })
    vi.mocked(userManager.getUser).mockResolvedValue(activeUser)

    const result = await validateUserAndToken('auth', 'validToken')

    expect(verifyToken).toHaveBeenCalledWith('validToken', 'auth')
    expect(userManager.getUser).toHaveBeenCalledWith('user1', {
      fields: ['id', 'role', 'status'],
    })
    expect(result).toEqual(activeUser)
  })
})
