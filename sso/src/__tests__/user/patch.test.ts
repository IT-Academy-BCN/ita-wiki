import supertest from 'supertest'
import { expect, it, describe, afterAll, beforeAll } from 'vitest'
import { z } from 'zod'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { client } from '../../models/db'
import { userPatchSchema } from '../../schemas'
import { checkPassword, hashPassword } from '../../utils/passwordHash'
import { UserRole, UserStatus } from '../../schemas/user/userSchema'

const id = 'va3dvcicw0ttxccoe328v6bo'
const dni = '11111111Q'
const email = 'example@example.com'
const password = 'hashedPassword'
const role = UserRole.REGISTERED
const status = UserStatus.INACTIVE
let itineraryId: string = ''
const route = `${pathRoot.v1.user}`
let authToken = ''

beforeAll(async () => {
  const response = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  authToken = response.body.authToken
  const { rows: itineraryRows } = await client.query(
    'SELECT id FROM "itinerary" LIMIT 1'
  )
  itineraryId = itineraryRows[0].id

  const createUserQuery = {
    text: 'INSERT INTO "user"(id, dni, email, password, itinerary_id) VALUES($1, $2, $3, $4, $5)',
    values: [id, dni, email, hashPassword(password), itineraryId],
  }
  await client.query(createUserQuery)
})

afterAll(async () => {
  await client.query('DELETE FROM "user" WHERE id = $1', [id])
})

describe('Testing patch user endpoint', () => {
  it('Should succeed with duplicated email', async () => {
    const body = {
      id,
      authToken,
      email,
    }
    const response = await supertest(server).patch(route).send(body)
    const parseResult = z.object({ body: userPatchSchema }).safeParse({
      body,
    })
    const userEmail = await client.query(
      'SELECT email FROM "user" WHERE id = $1',
      [id]
    )
    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
    expect(userEmail.rows[0].email).toBe(email)
  })
  it('Should succeed with duplicated dni', async () => {
    const body = {
      id,
      authToken,
      dni,
    }
    const response = await supertest(server).patch(route).send(body)
    const parseResult = z.object({ body: userPatchSchema }).safeParse({
      body,
    })
    const userDni = await client.query('SELECT dni FROM "user" WHERE id = $1', [
      id,
    ])
    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
    expect(userDni.rows[0].dni).toBe(dni)
  })
  it('Should succeed with duplicated role', async () => {
    const body = {
      id,
      authToken,
      role,
    }
    const response = await supertest(server).patch(route).send(body)
    const parseResult = z.object({ body: userPatchSchema }).safeParse({
      body,
    })
    const userRole = await client.query(
      'SELECT role FROM "user" WHERE id = $1',
      [id]
    )
    expect(userRole.rows[0].role).toBe(role)
    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
  })
  it('Should succeed with duplicated status', async () => {
    const body = {
      id,
      authToken,
      status,
    }
    const response = await supertest(server).patch(route).send(body)
    const parseResult = z.object({ body: userPatchSchema }).safeParse({
      body,
    })
    const userStatus = await client.query(
      'SELECT status FROM "user" WHERE id = $1',
      [id]
    )
    expect(userStatus.rows[0].status).toBe(status)
    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
  })
  it('Should succeed with duplicated password', async () => {
    const body = {
      id,
      authToken,
      password,
    }
    const response = await supertest(server).patch(route).send(body)
    const parseResult = z.object({ body: userPatchSchema }).safeParse({
      body,
    })
    const userPassword = await client.query(
      'SELECT password FROM "user" WHERE id = $1',
      [id]
    )
    expect(checkPassword(password, userPassword.rows[0].password)).toBeTruthy()
    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
  })
  it('An ADMIN user should succeed with valid update', async () => {
    const updatedUserPassword = 'ABC123456'
    const updatedUser = {
      email: 'newexample@example.com',
      dni: '73426589D',
      role: UserRole.MENTOR,
      status: UserStatus.ACTIVE,
    }
    const response = await supertest(server)
      .patch(route)
      .send({ id, authToken, password: updatedUserPassword, ...updatedUser })

    const userQuery = await client.query(
      'SELECT dni, email, password, role, status FROM "user" WHERE id = $1',
      [id]
    )
    const user = userQuery.rows[0]
    const { password: dbUserPassword, ...dbUser } = user
    expect(checkPassword(updatedUserPassword, dbUserPassword)).toBeTruthy()
    expect(dbUser).toEqual(updatedUser)
    expect(response.status).toBe(204)
  })
  it('Should return error if no id is provided', async () => {
    const body = { authToken }
    const parseResult = z.object({ body: userPatchSchema }).safeParse({
      body,
    })
    const response = await supertest(server).patch(route).send(body)
    expect(response.status).toBe(400)
    expect(parseResult.success).toBe(false)
    if (!parseResult.success) {
      expect(response.body.message).toEqual(parseResult.error.errors)
    }
  })
  it('Should return error if no token is provided', async () => {
    const body = { id }
    const parseResult = z.object({ body: userPatchSchema }).safeParse({
      body,
    })
    const response = await supertest(server).patch(route).send(body)
    expect(response.status).toBe(400)
    expect(parseResult.success).toBe(false)
    if (!parseResult.success) {
      expect(response.body.message).toEqual(parseResult.error.errors)
    }
  })
  it('Should return a error if no required user properties are provided in patch request', async () => {
    const body = { id, authToken }
    const parseResult = z.object({ body: userPatchSchema }).safeParse({
      body,
    })
    const response = await supertest(server).patch(route).send(body)
    expect(response.status).toBe(400)
    expect(parseResult.success).toBe(false)
    if (!parseResult.success) {
      expect(response.body.message).toEqual(parseResult.error.errors)
    }
  })
  it('Should NOT be able to access if user level is not ADMIN', async () => {
    const userResponse = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: testUserData.user.dni,
        password: testUserData.user.password,
      })
    const userAuthToken = userResponse.body.authToken
    const response = await supertest(server)
      .patch(route)
      .send({ id, authToken: userAuthToken, email: 'example1@example.com' })
    expect(response.status).toBe(403)
    expect(response.body.message).toBe(
      "Access denied. You don't have permissions"
    )
  })
})
