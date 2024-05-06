import supertest from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { userSchema } from '../../../schemas'
import { itinerariesData, server, testUserData } from '../../globalSetup'
import { client } from '../../../models/db'
import { DashboardUsersList } from '../../../schemas/users/dashboardUsersListSchema'
import { UserRole, UserStatus } from '../../../schemas/users/userSchema'

const route = `${pathRoot.v1.dashboard.users}`

const responseSchema = userSchema
  .pick({ id: true, name: true, dni: true, status: true, role: true })
  .extend({
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    itineraryName: z.string(),
  })
  .array()

let authAdminToken = ''
let users: DashboardUsersList
const testName = 'testing'
const testDni = '38826335N'
const testRole = UserRole.REGISTERED
const testStatus = UserStatus.ACTIVE
beforeAll(async () => {
  const loginRoute = `${pathRoot.v1.dashboard.auth}/login`
  const responseAdmin = await supertest(server).post(loginRoute).send({
    dni: testUserData.admin.dni,
    password: testUserData.admin.password,
  })
  ;[authAdminToken] = responseAdmin.header['set-cookie'][0].split(';')
  const queryResult = await client.query(
    `SELECT
    u.id,
    u.name AS name,
    u.dni AS dni,
    u.status,
    u.role,
    TO_CHAR(u.created_at, 'YYYY-MM-DD') AS "createdAt",
    i.name AS "itineraryName"
  FROM
    "user" u
  JOIN itinerary i ON u.itinerary_id = i.id;`
  )

  users = queryResult.rows
})
describe('Testing get users endpoint', () => {
  it('should fail to return a collection of users with a blocked logged-in admin', async () => {
    const adminDni = testUserData.admin.dni
    let newStatus = UserStatus.BLOCKED
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      newStatus,
      adminDni,
    ])
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(403)

    newStatus = UserStatus.ACTIVE
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      newStatus,
      adminDni,
    ])
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
    let newStatus = UserStatus.PENDING
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      newStatus,
      adminDni,
    ])
    const response2 = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])
    expect(response2.body.message).toBe('Only active users can proceed')
    expect(response2.status).toBe(403)

    newStatus = UserStatus.ACTIVE
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      newStatus,
      adminDni,
    ])
  })
  it('returns a  collection of users successfully with a logged-in admin user', async () => {
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(users.length)
    expect(response.body).toEqual(users)
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()
  })
  it('returns a  collection of users by itinerary slug successfully with a logged-in admin user ', async () => {
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
  it('returns a  collection of users by status successfully with a logged-in admin user ', async () => {
    const activeUsers = users.filter((u) => u.status === UserStatus.ACTIVE)
    const response = await supertest(server)
      .get(route)
      .query({ status: UserStatus.ACTIVE })
      .set('Cookie', [authAdminToken])
    const { body }: { body: DashboardUsersList } = response
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
  it('returns a  collection of users within a date range successfully with a logged-in admin user', async () => {
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
    const { body }: { body: DashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toHaveLength(7)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns a collection of users successfully with a name query of 2 or more characters', async () => {
    const response = await supertest(server)
      .get(route)
      .query({ name: testName })
      .set('Cookie', [authAdminToken])
    const { body }: { body: DashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(6)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns only the user that match the exact name when searched', async () => {
    const exactName = 'testingAdmin'
    const response = await supertest(server)
      .get(route)
      .query({ name: exactName })
      .set('Cookie', [authAdminToken])
    const { body }: { body: DashboardUsersList } = response
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
  it('returns 401 when no cookies are provided', async () => {
    const response = await supertest(server).get(route)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
  it('returns a user successfully with a dni query of 2 or more characters', async () => {
    const validDni = 'Z45035'
    const response = await supertest(server)
      .get(route)
      .query({ dni: validDni })
      .set('Cookie', [authAdminToken])
    const { body }: { body: DashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(1)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns a  collection of users by role successfully with a logged-in admin user ', async () => {
    const registeredUsers = users.filter((u) => u.role === UserRole.REGISTERED)
    const response = await supertest(server)
      .get(route)
      .query({ role: UserRole.REGISTERED })
      .set('Cookie', [authAdminToken])
    const { body }: { body: DashboardUsersList } = response
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
  it('returns a colletion of users by 4 diferent search values', async () => {
    const response = await supertest(server)
      .get(route)
      .query({
        name: testName,
        dni: testDni,
        role: testRole,
        status: testStatus,
      })
      .set('Cookie', [authAdminToken])
    const { body }: { body: DashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(2)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
})
