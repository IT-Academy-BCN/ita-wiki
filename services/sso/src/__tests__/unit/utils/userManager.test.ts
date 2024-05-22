import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { client } from '../../../db/client'
import { userManager } from '../../../db/managers/userManager'
import { UserStatus } from '../../../schemas/users/userSchema'

type MockUser = {
  id: string
  email: string
  status: string
}

vi.mock('../../../db/client', () => ({
  client: {
    query: vi.fn(),
  },
}))

describe('userManager.getUser', () => {
  const userId = '123'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should retrieve a user with the specified fields', async () => {
    const mockUser: MockUser = {
      id: userId,
      email: 'user@example.cat',
      status: UserStatus.ACTIVE,
    }
    ;(client.query as Mock).mockResolvedValue({ rows: [mockUser] })

    const user = await userManager.getUser(userId, {
      fields: ['id', 'email', 'status'],
    })

    expect(client.query).toHaveBeenCalledWith(
      `SELECT id, email, status FROM "user" WHERE id = $1 AND deleted_at IS NULL`,
      [userId]
    )
    expect(user).toEqual(mockUser)
  })

  it('should return null if user is not found', async () => {
    ;(client.query as Mock).mockResolvedValue({ rows: [] })

    const user = await userManager.getUser(userId, {
      fields: ['id', 'email', 'status'],
    })

    expect(client.query).toHaveBeenCalledWith(
      `SELECT id, email, status FROM "user" WHERE id = $1 AND deleted_at IS NULL`,
      [userId]
    )
    expect(user).toBeNull()
  })

  it('should handle SQL query errors', async () => {
    const errorMessage = 'SQL query failed'
    ;(client.query as Mock).mockRejectedValue(new Error(errorMessage))

    await expect(
      userManager.getUser(userId, {
        fields: ['id', 'email', 'status'],
      })
    ).rejects.toThrow(errorMessage)
  })
})

describe('userManager.getUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should retrieve a list of users with the specified fields and active status', async () => {
    const mockUsers: MockUser[] = [
      { id: '123', email: 'user1@example.com', status: UserStatus.ACTIVE },
      { id: '456', email: 'user2@example.com', status: UserStatus.ACTIVE },
    ]
    ;(client.query as Mock).mockResolvedValue({ rows: mockUsers })

    const users = await userManager.getUsersByIds(
      { fields: ['id', 'email', 'status'] },
      true,
      ['123', '456']
    )

    expect(client.query).toHaveBeenCalledWith(
      `SELECT id, email, status FROM "user" WHERE deleted_at IS NULL AND status = $1 AND id IN ($2, $3)`,
      ['ACTIVE', '123', '456']
    )
    expect(users).toEqual(mockUsers)
  })

  it('should retrieve a list of users with the specified fields without filtering by status', async () => {
    const mockUsers: MockUser[] = [
      { id: '123', email: 'user1@example.com', status: UserStatus.BLOCKED },
      { id: '456', email: 'user2@example.com', status: UserStatus.PENDING },
    ]
    ;(client.query as Mock).mockResolvedValue({ rows: mockUsers })

    const users = await userManager.getUsersByIds(
      { fields: ['id', 'email', 'status'] },
      false,
      ['123', '456']
    )

    expect(client.query).toHaveBeenCalledWith(
      `SELECT id, email, status FROM "user" WHERE deleted_at IS NULL AND id IN ($1, $2)`,
      ['123', '456']
    )
    expect(users).toEqual(mockUsers)
  })

  it('should return an empty array if no users are found', async () => {
    ;(client.query as Mock).mockResolvedValue({ rows: [] })

    const users = await userManager.getUsersByIds({
      fields: ['id', 'email', 'status'],
    })

    expect(client.query).toHaveBeenCalledWith(
      `SELECT id, email, status FROM "user" WHERE deleted_at IS NULL`,
      []
    )
    expect(users).toEqual([])
  })
})
