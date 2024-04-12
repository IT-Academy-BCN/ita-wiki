import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { UserStatus } from '../../../schemas/users/userSchema'
import { client } from '../../../models/db'

const route = `${pathRoot.v1.dashboard.users}/userId`

let adminAuthToken = ''
let userId = ''

beforeAll(async () => {
  const loginResponse = await supertest(server)
    .post(`${pathRoot.v1.dashboard.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  ;[adminAuthToken] = loginResponse.header['set-cookie'][0].split(';')

  const response = await supertest(server)
    .post(`${pathRoot.v1.dashboard.users}`)
    .set('Cookie', [adminAuthToken])
    .send({
      name: 'Test User',
      dni: '12345678',
      email: 'testuser@example.com',
    })

  userId = response.body.id
})

describe('Testing patch dashboard endpoint', () => {
  afterEach(async () => {
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      UserStatus.ACTIVE,
      testUserData.admin.dni,
    ])
  })
  it('should update the user successfully', async () => {
    const updates = { name: 'Updated Name', email: 'updated@example.com' }

    const response = await supertest(server)
      .patch(`${pathRoot.v1.dashboard.users}/${userId}`)
      .set('Cookie', [adminAuthToken])
      .send(updates)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(updates.name)
    expect(response.body.email).toBe(updates.email)
  })

  it('should return an error if the user does not exist', async () => {
    const nonExistingUserId = 'nonExistingUserId'
    const updates = { name: 'Name', email: 'email@example.com' }

    const response = await supertest(server)
      .patch(`${route}/${nonExistingUserId}`)
      .set('Cookie', [adminAuthToken])
      .send(updates)

    expect(response.status).toBe(404)
  })

  it('should return an error if no valid fields are provided for update', async () => {
    const updates = { invalidField: 'value' }

    const response = await supertest(server)
      .patch(`${pathRoot.v1.dashboard.users}/${userId}`)
      .set('Cookie', [adminAuthToken])
      .send(updates)

    expect(response.status).toBe(400)
  })
})
