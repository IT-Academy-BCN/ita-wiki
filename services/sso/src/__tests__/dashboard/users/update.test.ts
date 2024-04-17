import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { client } from '../../../models/db'
import { hashPassword } from '../../../utils/passwordHash'

const id = 'nmfg3bvexwotarwcpl6t5qjy'
const dni = 'Y1868974P'
const email = 'example@example.com'
const name = 'nameExample'
const password = 'hashedPassword'
const route = `${pathRoot.v1.dashboard.users}`
let adminAuthToken = ''

beforeAll(async () => {
  const response = await supertest(server)
    .post(`${pathRoot.v1.dashboard.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  ;[adminAuthToken] = response.header['set-cookie'][0].split(';')

  const exampleItineraty = await client.query(
    'SELECT id FROM "itinerary" LIMIT 1'
  )
  const itineraryId = exampleItineraty.rows[0].id
  const createUserQuery = {
    text: 'INSERT INTO "user"(id, dni, email, name, password, itinerary_id) VALUES($1, $2, $3, $4, $5, $6)',
    values: [id, dni, email, name, hashPassword(password), itineraryId],
  }
  await client.query(createUserQuery)
})

afterAll(async () => {
  await client.query('DELETE FROM "user" WHERE id = $1', [id])
})

describe('Testing patch dashboard endpoint', () => {
  it('should update the user successfully', async () => {
    const body = {
      name: 'newUserName',
      email: 'example@get.com',
    }
    const response = await supertest(server)
      .patch(`${route}/${id}`)
      .set('Cookie', [adminAuthToken])
      .send(body)

    const newData = await client.query(
      ' SELECT name, email FROM "user" WHERE id = $1',
      [id]
    )
    expect(response.status).toBe(204)
    expect(body.name).toBe(newData.rows[0].name)
    expect(body.email).toBe(newData.rows[0].email)
  })

  it('should return an error if the user does not exist', async () => {
    const nonExistingUserId = 'nthtnkrnwuvfpflw87r9fnx9'
    const body = { name: 'nonExistingUser', email: 'email@example.com' }
    const response = await supertest(server)
      .patch(`${route}/${nonExistingUserId}`)
      .set('Cookie', [adminAuthToken])
      .send(body)

    expect(response.status).toBe(404)
  })

  it('should return an error if no valid fields are provided for update', async () => {
    const body = { invalidField: 'value' }
    const response = await supertest(server)
      .patch(`${route}/${id}`)
      .set('Cookie', [adminAuthToken])
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return a 401 error due to invalid credentials', async () => {
    const body = { name: 'New Name', email: 'another@example.com' }
    const response = await supertest(server)
      .patch(`${route}/${id}`)
      .set('Cookie', ['invalidAuthToken'])
      .send(body)

    expect(response.status).toBe(401)
  })
})
