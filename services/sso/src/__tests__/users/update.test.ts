import supertest from 'supertest'
import { expect, it, describe, afterAll, beforeAll } from 'vitest'
import { z } from 'zod'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { userUpdateSchema } from '../../schemas'
import { checkPassword, hashPassword } from '../../utils/passwordHash'
import { UserRole, UserStatus } from '../../schemas/users/userSchema'
import db from '../../db/knexClient'
import { TItineraryListId } from '../../schemas/itineraries/itinerariesListSchema'

const id = 'va3dvcicw0ttxccoe328v6bo'
const dni = 'Y1868974P'
const email = 'example@example.com'
const name = 'nameExample'
const password = 'hashedPassword'
const role = UserRole.REGISTERED
const status = UserStatus.PENDING
const route = `${pathRoot.v1.users}`
let authToken = ''

beforeAll(async () => {
  const response = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  authToken = response.body.authToken

  const itineraryRows: TItineraryListId[] = await db('itinerary')
    .select('id')
    .limit(1)

  const itineraryId = itineraryRows[0].id

  await db('user').insert({
    id,
    dni,
    email,
    name,
    password: hashPassword(password),
    itinerary_id: itineraryId,
  })
})

afterAll(async () => {
  await db('user').where({ id }).del()
})

describe('Testing patch user endpoint', () => {
  it('Should succeed with duplicated email', async () => {
    const body = {
      authToken,
      email,
    }
    const response = await supertest(server).patch(`${route}/${id}`).send(body)
    const parseResult = z.object({ body: userUpdateSchema }).safeParse({
      body,
    })
    const userEmail = await db('user').select('email').where({ id })

    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
    expect(userEmail[0].email).toBe(email)
  })
  it('Should succeed with duplicated dni', async () => {
    const body = {
      authToken,
      dni,
    }
    const response = await supertest(server).patch(`${route}/${id}`).send(body)
    const parseResult = z.object({ body: userUpdateSchema }).safeParse({
      body,
    })
    const userDni = await db('user').select('dni').where({ id })

    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
    expect(userDni[0].dni).toBe(dni)
  })
  it('Should succeed with duplicated role', async () => {
    const body = {
      authToken,
      role,
    }
    const response = await supertest(server).patch(`${route}/${id}`).send(body)
    const parseResult = z.object({ body: userUpdateSchema }).safeParse({
      body,
    })
    const userRole = await db('user').select('role').where({ id })

    expect(userRole[0].role).toBe(role)
    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
  })
  it('Should succeed with duplicated status', async () => {
    const body = {
      authToken,
      status,
    }
    const response = await supertest(server).patch(`${route}/${id}`).send(body)
    const parseResult = z.object({ body: userUpdateSchema }).safeParse({
      body,
    })
    const userStatus = await db('user').select('status').where({ id })

    expect(userStatus[0].status).toBe(status)
    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
  })
  it('Should succeed with duplicated password', async () => {
    const body = {
      authToken,
      password,
    }
    const response = await supertest(server).patch(`${route}/${id}`).send(body)
    const parseResult = z.object({ body: userUpdateSchema }).safeParse({
      body,
    })
    const userPassword = await db('user').select('password').where({ id })

    expect(checkPassword(password, userPassword[0].password)).toBeTruthy()
    expect(response.status).toBe(204)
    expect(parseResult.success).toBe(true)
  })
  it('An ADMIN user should succeed with valid update', async () => {
    const updatedUserPassword = 'ABC123456'
    const updatedUser = {
      email: 'newexample@example.com',
      dni: '73426589D',
      role: UserRole.MENTOR,
      name: 'Example',
      status: UserStatus.ACTIVE,
    }
    const response = await supertest(server)
      .patch(`${route}/${id}`)
      .send({ authToken, password: updatedUserPassword, ...updatedUser })

    const userQuery = await db('user')
      .select('dni', 'email', 'name', 'password', 'role', 'status')
      .where({ id })

    const user = userQuery[0]
    const { password: dbUserPassword, ...dbUser } = user
    expect(checkPassword(updatedUserPassword, dbUserPassword)).toBeTruthy()
    expect(dbUser).toEqual(updatedUser)
    expect(response.status).toBe(204)
  })
  it('Should return error if no id is provided', async () => {
    const body = { authToken }
    const parseResult = z.object({ body: userUpdateSchema }).safeParse({
      body,
    })
    const response = await supertest(server).patch(`${route}/${id}`).send(body)
    expect(response.status).toBe(400)
    expect(parseResult.success).toBe(false)
    if (!parseResult.success) {
      expect(response.body.message).toEqual(parseResult.error.errors)
    }
  })
  it('Should return error if id does not exist', async () => {
    const body = { authToken, dni: '41247401Y' }

    const response = await supertest(server)
      .patch(`${route}/isymca60mpt2aut9dd9jn884`)
      .send(body)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('User not found')
  })
  it('Should return error if no token is provided', async () => {
    const body = { dni }
    const parseResult = z.object({ body: userUpdateSchema }).safeParse({
      body,
    })
    const response = await supertest(server).patch(`${route}/${id}`).send(body)
    expect(response.status).toBe(400)
    expect(parseResult.success).toBe(false)
    if (!parseResult.success) {
      expect(response.body.message).toEqual(parseResult.error.errors)
    }
  })
  it('Should return a error if no required user properties are provided in patch request', async () => {
    const body = { id, authToken }
    const parseResult = z.object({ body: userUpdateSchema }).safeParse({
      body,
    })
    const response = await supertest(server).patch(`${route}/${id}`).send(body)
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
      .patch(`${route}/${id}`)
      .send({ authToken: userAuthToken, email: 'example1@example.com' })
    expect(response.status).toBe(403)
    expect(response.body.message).toBe(
      "Access denied. You don't have permissions"
    )
  })
  it('Should NOT be able to access if the ADMIN loses "active" status', async () => {
    const response1 = await supertest(server)
      .patch(`${route}/${id}`)
      .send({ authToken, email: 'example1@example.com' })
    expect(response1.status).toBe(204)
    const adminDni = testUserData.admin.dni
    let newStatus = UserStatus.PENDING
    await db('user').update({ status: newStatus }).where({ dni: adminDni })

    const response2 = await supertest(server)
      .patch(`${route}/${id}`)
      .send({ authToken, email: 'example1@example.com' })
    expect(response2.status).toBe(403)
    expect(response2.body.message).toBe('Only active users can proceed')
    newStatus = UserStatus.ACTIVE
    await db('user').update({ status: newStatus }).where({ dni: adminDni })
  })
})
