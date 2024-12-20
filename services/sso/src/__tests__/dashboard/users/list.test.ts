import supertest from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { userSchema } from '../../../schemas'
import { itinerariesData, server, testUserData } from '../../globalSetup'
import db from '../../../db/knexClient'
import { TDashboardUsersList } from '../../../schemas/users/dashboardUsersListSchema'
import { UserRole, UserStatus } from '../../../schemas/users/userSchema'
import { dashboardLoginAndGetToken } from '../../helpers/testHelpers'

const route = `${pathRoot.v1.dashboard.users}`

const responseSchema = userSchema
  .pick({ id: true, name: true, dni: true, status: true, role: true })
  .extend({
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    itineraryName: z.string(),
    deletedAt: z.string().nullable(),
  })
  .array()

let authAdminToken = ''
let authMentorToken = ''
let users: TDashboardUsersList
const testName = 'testing'
const testDni = '38826335N'
const testRole = UserRole.REGISTERED
const testStatus = UserStatus.ACTIVE

beforeAll(async () => {
  authAdminToken = await dashboardLoginAndGetToken(
    testUserData.admin.dni,
    testUserData.admin.password
  )
  authMentorToken = await dashboardLoginAndGetToken(
    testUserData.mentor.dni,
    testUserData.mentor.password
  )

  users = await db('user as u')
    .join('itinerary as i', 'u.itinerary_id', '=', 'i.id')
    .select(
      'u.id',
      'u.name as name',
      'u.dni as dni',
      'u.status',
      'u.role',
      'u.deleted_at as deletedAt',
      db.raw('TO_CHAR(u.created_at, \'YYYY-MM-DD\') as "createdAt"'),
      'i.name as itineraryName'
    )
})

describe('Testing get users endpoint', () => {
  it('returns a collection of users successfully, with a logged-in admin user', async () => {
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(200)
    expect(response.body).toEqual(users)
    expect(response.body).toHaveLength(users.length)
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()
  })
  it('Returns a collection of users successfully with a logged-in mentor user, where the collection must contain users with the same itinerary.', async () => {
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [authMentorToken])
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()

    const firstItineraryName = response.body[0].itineraryName
    const allSameItinerary = responseSchema
      .parse(response.body)
      .every((user) => user.itineraryName === firstItineraryName)
    expect(allSameItinerary).toBe(true)
  })
  it('returns a collection of users by itinerary slug successfully with a logged-in admin user ', async () => {
    const response = await supertest(server)
      .get(route)
      .query({ itinerarySlug: itinerariesData[3].slug })
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toEqual([
      users.find((u) => u.name === testUserData.admin.name),
    ])
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()
  })
  it('returns an empty collection of users for an itinerary slug when no users are assigned, with admin logged in', async () => {
    const response = await supertest(server)
      .get(route)
      .query({ itinerarySlug: itinerariesData[6].slug })
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
    expect(response.body).toEqual([])
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()
  })
  it('returns a collection of users by status successfully with a logged-in admin user ', async () => {
    const activeUsers = users.filter((u) => u.status === UserStatus.ACTIVE)
    const response = await supertest(server)
      .get(route)
      .query({ status: UserStatus.ACTIVE })
      .set('Cookie', [authAdminToken])
    const { body }: { body: TDashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toHaveLength(5)
    body.forEach((user) => {
      expect(user.status).toBe(UserStatus.ACTIVE)
    })
    const sortedResponseBody = body.sort((a, b) => a.id.localeCompare(b.id))
    const sortedExpected = activeUsers.sort((a, b) => a.id.localeCompare(b.id))
    expect(sortedResponseBody).toEqual(sortedExpected)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns a collection of users within a date range successfully with a logged-in admin user, [NOT WORK WITHIN 00:00-02:00 AM!!]', async () => {
    const dateMinusOne = new Date()
    dateMinusOne.setDate(dateMinusOne.getDate() - 1)
    const datePlusOne = new Date()
    datePlusOne.setDate(datePlusOne.getDate() + 1)
    const startDate = dateMinusOne.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    })
    const endDate = datePlusOne.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    })
    const response = await supertest(server)
      .get(route)
      .query({
        startDate,
        endDate,
      })
      .set('Cookie', [authAdminToken])
    const { body }: { body: TDashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toHaveLength(7)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns a collection of users successfully with a name query of 2 or more characters', async () => {
    const response = await supertest(server)
      .get(route)
      .query({ name: testName })
      .set('Cookie', [authAdminToken])
    const { body }: { body: TDashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
    body.forEach((user) => {
      expect(user.name).toContain(testName)
    })
  })
  it('returns only the user that match the exact name when searched', async () => {
    const exactName = 'testingAdmin'
    const response = await supertest(server)
      .get(route)
      .query({ name: exactName })
      .set('Cookie', [authAdminToken])
    const { body }: { body: TDashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(1)
    expect(body[0].name).toBe('testingAdmin')
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns Zod error when name query is less than 2 characters', async () => {
    const response = await supertest(server)
      .get(route)
      .query({ name: 'a' })
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(400)
    expect(response.body.message[0].message).toContain(
      'String must contain at least 2 character(s)'
    )
  })
  it('returns a user successfully with a dni query of 2 or more characters', async () => {
    const validDni = 'Z45035'
    const response = await supertest(server)
      .get(route)
      .query({ dni: validDni })
      .set('Cookie', [authAdminToken])
    const { body }: { body: TDashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(1)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns a collection of users by role successfully with a logged-in admin user ', async () => {
    const registeredUsers = users.filter((u) => u.role === UserRole.REGISTERED)
    const response = await supertest(server)
      .get(route)
      .query({ role: UserRole.REGISTERED })
      .set('Cookie', [authAdminToken])
    const { body }: { body: TDashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toHaveLength(5)
    body.forEach((user) => {
      expect(user.role).toBe(UserRole.REGISTERED)
    })
    const sortedResponseBody = body.sort((a, b) => a.id.localeCompare(b.id))
    const sortedExpected = registeredUsers.sort((a, b) =>
      a.id.localeCompare(b.id)
    )
    expect(sortedResponseBody).toEqual(sortedExpected)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns a user by 4 diferent search values', async () => {
    const response = await supertest(server)
      .get(route)
      .query({
        name: testName,
        dni: testDni,
        role: testRole,
        status: testStatus,
      })
      .set('Cookie', [authAdminToken])
    const { body }: { body: TDashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(1)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
})
describe('User Status Handling in Get Users Endpoint', () => {
  afterEach(async () => {
    await db('user')
      .update({ status: UserStatus.ACTIVE })
      .where('dni', testUserData.admin.dni)
  })
  it('should fail to return a collection of users with a blocked logged-in admin', async () => {
    const adminDni = testUserData.admin.dni
    const newStatus = UserStatus.BLOCKED
    await db('user').update({ status: newStatus }).where('dni', adminDni)
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(403)
  })

  it('should fail to return a collection of users when the logged-in admin loses "active" status', async () => {
    const response1 = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])
    expect(response1.status).toBe(200)
    expect(response1.body).toHaveLength(users.length)
    expect(response1.body).toEqual(users)
    expect(responseSchema.safeParse(response1.body).success).toBeTruthy()

    const adminDni = testUserData.admin.dni
    const newStatus = UserStatus.PENDING
    await db('user').update({ status: newStatus }).where('dni', adminDni)
    const response2 = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])
    expect(response2.body.message).toBe('Only active users can proceed')
    expect(response2.status).toBe(403)
  })
})
