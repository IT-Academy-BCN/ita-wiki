import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'

describe('Testing ME endpoint', () => {
  test('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.auth}/me`)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Unauthorized: Missing token')
  })
  test('Should return user admin info', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.auth}/me`)
      .set('Cookie', authToken.admin)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        name: testUserData.admin.name,
        dni: testUserData.admin.dni,
        email: testUserData.admin.email,
        status: 'INACTIVE',
        role: testUserData.admin.role,
      })
    )
  })
})
