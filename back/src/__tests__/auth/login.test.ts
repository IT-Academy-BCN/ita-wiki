import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'

describe('Testing authentication endpoint', () => {
  test('should succeed with correct credentials', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: testUserData.admin.dni,
        password: testUserData.admin.password,
      })
    expect(response.status).toBe(204)

    const cookie = response.header['set-cookie'] as string[]
    expect(cookie[0]).toMatch(/authToken/)
    expect(cookie[1]).toMatch(/refreshToken/)
  })

  test('should fail if user not active', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: testUserData.inactiveUser.dni,
        password: testUserData.inactiveUser.password,
      })
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Only active users can login')
  })

  test('should fail with incorrect password', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: testUserData.admin.dni,
        password: 'wrong password',
      })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid credentials')
  })

  test('should fail with user not found', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: '11111111b',
        password: 'password1',
      })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid credentials')
  })
})
