import supertest from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { userSchema } from '../../../schemas'
import { itinerariesData, server, testUserData } from '../../globalSetup'
import { client } from '../../../models/db'
import { DashboardUsersList } from '../../../schemas/users/dashboardUsersListSchema'
import { UserStatus } from '../../../schemas/users/userSchema'

const route = `${pathRoot.v1.dashboard.users}`

const responseSchema = userSchema
  .pick({ id: true, name: true, status: true })
  .extend({
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    itineraryName: z.string(),
  })
  .array()

let authToken = ''
let users: DashboardUsersList

beforeAll(async () => {
  const loginRoute = `${pathRoot.v1.dashboard.auth}/login`
  const responseAdmin = await supertest(server).post(loginRoute).send({
    dni: testUserData.admin.dni,
    password: testUserData.admin.password,
  })
  ;[authToken] = responseAdmin.header['set-cookie'][0].split(';')
  const queryResult = await client.query(
    `SELECT
    u.id,
    u.name AS name,
    i.name AS "itineraryName",
    u.status,
    TO_CHAR(u.created_at, 'YYYY-MM-DD') AS "createdAt"
  FROM
    "user" u
  JOIN itinerary i ON u.itinerary_id = i.id;`
  )
  users = queryResult.rows
})
describe('Testing get users endpoint', () => {
  it('returns a  collection of users successfully with a logged-in admin user', async () => {
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [authToken])
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(users.length)
    expect(response.body).toEqual(users)
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()
  })
  it('returns a  collection of users by itinerary slug successfully with a logged-in admin user ', async () => {
    const response = await supertest(server)
      .get(route)
      .query({ itinerarySlug: itinerariesData[3].slug })
      .set('Cookie', [authToken])
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
      .query({ itinerarySlug: itinerariesData[4].slug })
      .set('Cookie', [authToken])
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
      .set('Cookie', [authToken])
    const { body }: { body: DashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toHaveLength(3)
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
      .set('Cookie', [authToken])
    const { body }: { body: DashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toHaveLength(4)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns a collection of users successfully with a name query of 2 or more characters', async () => {
    const validName = 'testing'
    const response = await supertest(server)
      .get(route)
      .query({ name: validName })
      .set('Cookie', [authToken])
    const { body }: { body: DashboardUsersList } = response
    expect(response.status).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(4)
    expect(responseSchema.safeParse(body).success).toBeTruthy()
  })
  it('returns only the user that match the exact name when searched', async () => {
    const exactName = 'testingAdmin'
    const response = await supertest(server)
      .get(route)
      .query({ name: exactName })
      .set('Cookie', [authToken])
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
      .set('Cookie', [authToken])
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
})
