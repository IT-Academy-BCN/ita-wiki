import supertest from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { z } from 'zod'
import { pathRoot } from '../../../routes/routes'
import { userSchema } from '../../../schemas'
import { itinerariesData, server, testUserData } from '../../globalSetup'
import { client } from '../../../models/db'
import { DashboardUsersList } from '../../../schemas/users/dashboardUsersListSchema'

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
  it('returns 401 when no cookies are provided', async () => {
    const response = await supertest(server).get(route)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
})
