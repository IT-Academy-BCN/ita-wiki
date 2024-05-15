import supertest from 'supertest'
import { expect, it, describe, beforeAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { generateExpiredToken } from '../../utils/jwtAuth'

const route = `${pathRoot.v1.tokens}/refresh`
let refreshToken = ''

beforeAll(async () => {
  const response = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  refreshToken = response.body.refreshToken
})

describe('Testing refresh token endpoint', () => {
  it('should succeed with a valid token', async () => {
    const response = await supertest(server)
      .post(route)
      .set('Authorization', `Bearer ${refreshToken}`)

    expect(response.status).toBe(200)
    expect(response.body.authToken).toBeDefined()
    expect(response.body.authToken).toBeTypeOf('string')
  })

  it('should fail with InvalidCredentials error for no token', async () => {
    const response = await supertest(server).post(route)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })

  it('should fail with InvalidCredentials error for invalid token', async () => {
    const response = await supertest(server)
      .post(route)
      .set('Authorization', 'Bearer invalid_token')

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token is not valid')
  })

  it('should fail and suggest refresh when token is expired', async () => {
    const token = generateExpiredToken(testUserData.admin.id, 'refresh')
    const response = await supertest(server)
      .post(route)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token has expired')
  })
})
