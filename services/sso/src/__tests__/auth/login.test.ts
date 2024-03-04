import supertest from 'supertest'
import { expect, it, describe } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { tokenSchema } from '../../schemas/tokens/tokenSchema'

describe('Testing authentication endpoint', () => {
  it('should succeed with correct credentials', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: testUserData.admin.dni,
        password: testUserData.admin.password,
      })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should succeed with correct credentials and uppercase DNI', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: testUserData.admin.dni.toUpperCase(),
        password: testUserData.admin.password,
      })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should succeed with correct credentials and lowercase DNI', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: testUserData.admin.dni.toLowerCase(),
        password: testUserData.admin.password,
      })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should fail with incorrect password', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: testUserData.admin.dni,
        password: 'wrong password',
      })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })

  it('should fail with user not found', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/login`)
      .send({
        dni: '11111111b',
        password: 'password1',
      })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
})

it('should fail if user not active', async () => {
  const response = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.inactiveUser.dni,
      password: testUserData.inactiveUser.password,
    })
  expect(response.status).toBe(403)
  expect(response.body.message).toBe('Only active users can login')
})