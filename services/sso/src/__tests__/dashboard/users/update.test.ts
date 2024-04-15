import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { UserStatus } from '../../../schemas/users/userSchema'
import { client } from '../../../models/db'

let adminAuthToken = ''
let userId = ''
let route = ''

beforeAll(async () => {
  const loginResponse = await supertest(server)
    .post(`${pathRoot.v1.dashboard.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  adminAuthToken = loginResponse.header['set-cookie'][0].split(';')

  const response = await supertest(server)
    .post(`${pathRoot.v1.dashboard.users}/${userId}`)
    .set('Cookie', adminAuthToken)
    .send({
      dni: 'Y4896094Y',
      name: 'Test User',
      email: 'testuser@example.com',
    })

  userId = response.body.id
  route = `${pathRoot.v1.dashboard.users}/${userId}`
})

describe('Testing patch dashboard endpoint', () => {
  afterEach(async () => {
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      UserStatus.ACTIVE,
      testUserData.admin.dni,
    ])
  })

  it('should update the user successfully', async () => {
    const updates = {
      dni: 'Y8996767D',
      name: 'Updated Name',
      email: 'updated@example.com',
    }

    const response = await supertest(server)
      .patch(route)
      .set('Cookie', adminAuthToken)
      .send(updates)

    expect(response.status).toBe(200)
    expect(response.body.dni).toBe(updates.dni)
    expect(response.body.name).toBe(updates.name)
    expect(response.body.email).toBe(updates.email)
  })

  it('should return an error if the user does not exist', async () => {
    const nonExistingUserId = 'nonExistingUserId'
    const updates = { name: 'Name', email: 'email@example.com' }

    const response = await supertest(server)
      .patch(`${route}/${nonExistingUserId}`)
      .set('Cookie', adminAuthToken)
      .send(updates)

    expect(response.status).toBe(404)
  })

  it('should return an error if no valid fields are provided for update', async () => {
    const updates = { invalidField: 'value' }

    const response = await supertest(server)
      .patch(route)
      .set('Cookie', adminAuthToken)
      .send(updates)

    expect(response.status).toBe(400)
  })

  it('should return a 401 error due to invalid credentials', async () => {
    const updates = { name: 'New Name', email: 'another@example.com' }
    const response = await supertest(server)
      .patch(route)
      .set('Cookie', 'invalidAuthToken')
      .send(updates)

    expect(response.status).toBe(401)
  })
})
