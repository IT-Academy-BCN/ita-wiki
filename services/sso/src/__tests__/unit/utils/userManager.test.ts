import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterEach,
} from 'vitest'
import { createTracker, MockClient, Tracker } from 'knex-mock-client'
import knex from 'knex'
import { userManager } from '../../../db/managers/userManager'
import { UserStatus } from '../../../schemas/users/userSchema'
import db from '../../../db/knexClient'

type MockUser = {
  id: string
  email: string
  status: string
  deletedAt?: null | Date
}
let tracker: Tracker
beforeAll(() => {
  tracker = createTracker(db)
})
beforeEach(() => {
  vi.clearAllMocks()
})
afterEach(() => {
  tracker.reset()
})

vi.mock('../../../db/knexClient', async () => {
  const bd = knex({
    client: MockClient,
    dialect: 'pg',
  })
  return {
    default: bd,
  }
})
describe('userManager.getUser', () => {
  const userId = '123'

  it('should retrieve a user with the specified fields', async () => {
    const mockUser: MockUser = {
      id: userId,
      email: 'user@example.cat',
      status: UserStatus.ACTIVE,
    }
    tracker.on.select('user').response([mockUser])

    const user = await userManager.getUser(userId, {
      fields: ['id', 'email', 'status'],
    })
    expect(tracker.history.select[0].sql).toEqual(
      'select "id, email, status" from "user" where "id" = $1 and "deleted_at" is null'
    )
    expect(user).toEqual(mockUser)
  })

  it('should return null if user is not found', async () => {
    tracker.on.select('user').response([])

    const user = await userManager.getUser(userId, {
      fields: ['id', 'email', 'status'],
    })
    expect(tracker.history.select[0].sql).toEqual(
      'select "id, email, status" from "user" where "id" = $1 and "deleted_at" is null'
    )
    expect(user).toBeNull()
  })

  it('should handle SQL query errors', async () => {
    const errorMessage = 'SQL query failed'
    tracker.on.select('user').simulateError(errorMessage)

    await expect(
      userManager.getUser(userId, {
        fields: ['id', 'email', 'status'],
      })
    ).rejects.toThrow(errorMessage)
  })
})

describe('userManager.getUsers', () => {
  it('should retrieve a list of users with the specified fields and active status', async () => {
    const mockUsers: MockUser[] = [
      {
        id: '123',
        email: 'user1@example.com',
        status: UserStatus.ACTIVE,
      },
      {
        id: '456',
        email: 'user2@example.com',
        status: UserStatus.ACTIVE,
      },
    ]

    tracker.on.select('user').response(mockUsers)
    const users = await userManager.getUsersByIds(
      { fields: ['id', 'email', 'status'] },
      true,
      ['123', '456']
    )
    expect(tracker.history.all[0].sql).toEqual(
      'select "id, email, status" from "user" where "deleted_at" is null and "status" = $1 and "id" in ($2, $3)'
    )
    expect(tracker.history.all[0].bindings).toEqual(['ACTIVE', '123', '456'])
    expect(users).toEqual(mockUsers)
  })

  it('should retrieve a list of users with the specified fields without filtering by status', async () => {
    const mockUsers: MockUser[] = [
      {
        id: '123',
        email: 'user1@example.com',
        status: UserStatus.BLOCKED,
      },
      {
        id: '456',
        email: 'user2@example.com',
        status: UserStatus.PENDING,
      },
    ]

    tracker.on.select('user').response(mockUsers)

    const users = await userManager.getUsersByIds(
      { fields: ['id', 'email', 'status'] },
      false,
      ['123', '456']
    )

    expect(tracker.history.all[0].sql).toEqual(
      'select "id, email, status" from "user" where "deleted_at" is null and "id" in ($1, $2)'
    )
    expect(tracker.history.all[0].bindings).toEqual(['123', '456'])

    expect(users).toEqual(mockUsers)
  })

  it('should return an empty array if no users are found', async () => {
    tracker.on.select('user').response([])

    const users = await userManager.getUsersByIds({
      fields: ['id', 'email', 'status'],
    })
    expect(tracker.history.all[0].sql).toEqual(
      'select "id, email, status" from "user" where "deleted_at" is null'
    )
    expect(users).toEqual([])
  })
})

describe('userManager.findById', () => {
  const userId = '123'

  it('should retrieve a user by ID with the specified fields', async () => {
    const mockUser: MockUser = {
      id: userId,
      email: 'user@example.cat',
      status: UserStatus.ACTIVE,
    }
    tracker.on.select('user').response([mockUser])

    const user = await userManager.findById(userId, {
      fields: ['id', 'email', 'status'],
    })

    expect(user).toEqual(mockUser)
  })

  it('should return null if user is not found', async () => {
    tracker.on.select('user').response([])

    const user = await userManager.findById(userId, {
      fields: ['id', 'email', 'status'],
    })

    expect(user).toBeNull()
  })

  it('should handle SQL query errors', async () => {
    tracker.on.select('user').simulateError('SQL query failed')

    await expect(
      userManager.findById(userId, { fields: ['id', 'email', 'status'] })
    ).rejects.toThrow('SQL query failed')
  })
})

describe('userManager.findByDni', () => {
  const userDni = '12345678A'

  it('should retrieve a user by DNI with the specified fields', async () => {
    const mockUser = {
      id: '1',
      dni: userDni,
      email: 'user@example.cat',
      status: UserStatus.ACTIVE,
    }
    tracker.on.select('user').response([mockUser])

    const user = await userManager.findByDni(userDni, {
      fields: ['id', 'email', 'status'],
    })

    expect(user).toEqual(mockUser)
  })

  it('should return null if user is not found', async () => {
    tracker.on.select('user').response([])

    const user = await userManager.findByDni(userDni, {
      fields: ['id', 'email', 'status'],
    })

    expect(user).toBeNull()
  })

  it('should handle SQL query errors', async () => {
    tracker.on.select('user').simulateError('SQL query failed')

    await expect(
      userManager.findByDni(userDni, { fields: ['id', 'email', 'status'] })
    ).rejects.toThrow('SQL query failed')
  })

  describe('userManger.updateUserByIds', () => {
    const userId = '123'

    it('Should return nothing but set a new values on fields specified', async () => {
      const mockUser: MockUser = {
        id: userId,
        email: 'user1@example.com',
        status: UserStatus.ACTIVE,
        deletedAt: null,
      }
      const mockUserUpdated: MockUser = {
        id: userId,
        email: 'joanbr4@itacademy.cat',
        status: UserStatus.ACTIVE,
        deletedAt: new Date('2024-07-28 22:02:15.668467+00'),
      }

      tracker.on.select('user').response([mockUser])

      const response0 = await userManager.findById(userId, {
        fields: ['id', 'email', 'deletedAt'],
      })

      expect(response0).toEqual(mockUser)

      tracker.on.update('user').response([])

      await userManager.updateUserByIds(
        {
          email: 'joanbr4@itacademy.cat',
          deletedAt: '2024-07-28 22:02:15.668467+00',
        },
        [userId]
      )

      tracker.reset()

      tracker.on.select('user').response([mockUserUpdated])

      const response2 = await userManager.findById(userId, {
        fields: ['id', 'email', 'deletedAt'],
      })

      expect(response2).toEqual(mockUserUpdated)
    })

    it('should return null if user is not found', async () => {
      tracker.on.select('user').response([])

      const user = await userManager.findById(userId, {
        fields: ['id', 'email', 'status'],
      })

      expect(user).toBeNull()
    })

    it('should handle SQL query errors', async () => {
      tracker.on.select('user').simulateError('SQL query failed')

      await expect(
        userManager.findById(userId, { fields: ['id', 'email', 'status'] })
      ).rejects.toThrow('SQL query failed')
    })
  })
})
