import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { client } from '../../../db/client'
import { userManager } from '../../../db/managers/userManager'

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

describe('userManager', () => {
  const userId = '123'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should retrieve a user with the specified fields', async () => {
    const mockUser: MockUser = {
      id: userId,
      email: 'user@example.cat',
      status: 'ACTIVE',
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
