import { describe, expect, it } from 'vitest'
import { queryBuilder } from '../../utils/queryBuilder'
import { UserRole } from '../../schemas/users/userSchema'
import { extendedUserStatus } from '../../schemas/users/dashboardUsersListQuerySchema'

const testName = 'testing'
const testDni = '38826335N'
const testRole = UserRole.REGISTERED
const testStatus = extendedUserStatus.ACTIVE
const testDate = '2024-04-28T22:00:00.000Z'

describe('Testing query builder function', () => {
  it('returns a expected query calling the queryBuilder function with name, dni, role and status', async () => {
    const searchValues = {
      name: testName,
      dni: testDni,
      role: testRole,
      status: testStatus,
    }
    const expectedWhere = `WHERE (u.name ILIKE $1 OR u.dni ILIKE $2) AND u.status = $3 AND u.role = $4`
    const expectedParams = ['%testing%', '%38826335N%', 'ACTIVE', 'REGISTERED']
    const resultQuery = queryBuilder(searchValues)
    const resultWhere = resultQuery.query.substring(274)
    expect(resultWhere).toBe(expectedWhere)
    expect(resultQuery.queryParams).toEqual(expectedParams)
  })
  it('returns a expected query calling the queryBuilder function with name, startDate and endDate', async () => {
    const searchValues = {
      name: testName,
      endDate: testDate,
      startDate: testDate,
    }
    const expectedWhere = `WHERE (u.name ILIKE $1) AND u.created_at >= $2 AND u.created_at <= $3`
    const expectedParams = [
      '%testing%',
      new Date('2024-04-28T22:00:00.000Z'),
      new Date('2024-04-28T22:00:00.000Z'),
    ]
    const resultQuery = queryBuilder(searchValues)
    const resultWhere = resultQuery.query.substring(274)
    expect(resultWhere).toBe(expectedWhere)
    expect(resultQuery.queryParams).toEqual(expectedParams)
  })
  it('returns a expected query calling the queryBuilder function with name and dni', async () => {
    const searchValues = {
      name: testName,
      dni: testDni,
    }
    const expectedWhere = `WHERE (u.name ILIKE $1 OR u.dni ILIKE $2)`
    const expectedParams = ['%testing%', '%38826335N%']
    const resultQuery = queryBuilder(searchValues)
    const resultWhere = resultQuery.query.substring(274)
    expect(resultWhere).toBe(expectedWhere)
    expect(resultQuery.queryParams).toEqual(expectedParams)
  })
  it('returns a expected query calling the queryBuilder function with dni, status and endDate', async () => {
    const searchValues = {
      dni: testDni,
      status: testStatus,
      endDate: testDate,
    }
    const expectedWhere = `WHERE (u.dni ILIKE $1) AND u.status = $2 AND u.created_at <= $3`
    const expectedParams = [
      '%38826335N%',
      'ACTIVE',
      new Date('2024-04-28T22:00:00.000Z'),
    ]
    const resultQuery = queryBuilder(searchValues)
    const resultWhere = resultQuery.query.substring(274)
    expect(resultWhere).toBe(expectedWhere)
    expect(resultQuery.queryParams).toEqual(expectedParams)
  })
  it('returns a expected query calling the queryBuilder function with DELETED status', async () => {
    const searchValues = {
      status: extendedUserStatus.DELETED,
    }
    const expectedWhere = `WHERE u.deleted_at IS NOT NULL`
    const expectedParams = []
    const resultQuery = queryBuilder(searchValues)
    const resultWhere = resultQuery.query.substring(274)
    expect(resultWhere).toBe(expectedWhere)
    expect(resultQuery.queryParams).toEqual(expectedParams)
  })
})
