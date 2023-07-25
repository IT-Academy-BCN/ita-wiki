import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'

describe('Testing GET endpoint', () => {
  test('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.users}`)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Unauthorized: Missing token')
  })

  test('Should return successful response if valid token provided', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', authToken.admin)
    expect(response.status).toBe(200)
  })

  test('Should NOT be able to access if user level is REGISTERED', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', authToken.user)
    expect(response.status).toBe(403)
  })

  test('Should NOT be able to access if user level is MENTOR', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', authToken.mentor)
    expect(response.status).toBe(403)
  })

  test('Should be able to retrieve user info if user level is ADMIN', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', authToken.admin)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          email: testUserData.admin.email,
          name: testUserData.admin.name,
          dni: testUserData.admin.dni,
          role: testUserData.admin.role,
          status: testUserData.admin.status,
          createdAt: expect.any(String),
          id: expect.any(String),
          updatedAt: expect.any(String),
          specializationName: expect.any(String),
        },
        {
          email: testUserData.inactiveUser.email,
          name: testUserData.inactiveUser.name,
          dni: testUserData.inactiveUser.dni,
          role: testUserData.inactiveUser.role,
          status: testUserData.inactiveUser.status,
          createdAt: expect.any(String),
          id: expect.any(String),
          updatedAt: expect.any(String),
          specializationName: expect.any(String),
        },
        {
          email: testUserData.mentor.email,
          name: testUserData.mentor.name,
          dni: testUserData.mentor.dni,
          role: testUserData.mentor.role,
          status: testUserData.mentor.status,
          createdAt: expect.any(String),
          id: expect.any(String),
          updatedAt: expect.any(String),
          specializationName: expect.any(String),
        },
        {
          email: testUserData.user.email,
          name: testUserData.user.name,
          dni: testUserData.user.dni,
          role: testUserData.user.role,
          status: testUserData.user.status,
          createdAt: expect.any(String),
          id: expect.any(String),
          updatedAt: expect.any(String),
          specializationName: expect.any(String),
        },
      ])
    )
  })
})
