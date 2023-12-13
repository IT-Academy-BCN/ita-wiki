import supertest from 'supertest'
import { expect, it, describe, expectTypeOf } from 'vitest'
import { User } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoServer'

describe('Testing GET endpoint', () => {
  it('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.users}`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })

  checkInvalidToken(`${pathRoot.v1.users}`, 'get')

  it('Should return successful response if valid token provided', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(response.status).toBe(200)
  })

  it('Should NOT be able to access if user level is REGISTERED', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.user}`])
    expect(response.status).toBe(403)
  })

  it('Should NOT be able to access if user level is MENTOR', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.mentor}`])
    expect(response.status).toBe(403)
  })

  it('Should be able to retrieve user info if user level is ADMIN', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBe(Object.keys(testUserData).length)
  })

  it('Info retrieved by ADMIN should be of type User without password []', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    type UsersWithoutPassword = Omit<User, 'password'>

    expect(response.status).toBe(200)
    response.body.forEach((user: UsersWithoutPassword) => {
      expect(user).not.toHaveProperty('password')
      expectTypeOf(user).toEqualTypeOf<UsersWithoutPassword>()
    })
  })
})
