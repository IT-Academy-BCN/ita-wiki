import supertest from 'supertest'
import { expect, it, describe, beforeAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { userSchema } from '../../schemas'

const route = `${pathRoot.v1.tokens}/validate`
let authToken = ''
beforeAll(async () => {
  const response = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  authToken = response.body.authToken
})
describe('Testing validate token endpoint', () => {
  it('should succeed with a valid token', async () => {
    const response = await supertest(server).post(route).send({
      authToken,
    })
    expect(response.status).toBe(200)
    expect(response.body.id).toBeTypeOf('string')
    expect(
      userSchema.pick({ id: true }).safeParse(response.body).success
    ).toBeTruthy()
  })
  it('should fail with Zod validation error for no token', async () => {
    const response = await supertest(server).post(route).send({ authToken: '' })
    expect(response.status).toBe(400)

    expect(response.body).toStrictEqual({
      message: [
        {
          code: 'too_small',
          minimum: 1,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'String must contain at least 1 character(s)',
          path: ['body', 'authToken'],
        },
      ],
    })
  })
  it('should fail with Zod validation error for invalid field', async () => {
    const response = await supertest(server).post(route).send({ token: '' })
    expect(response.status).toBe(400)
  })
  it('should fail with InvalidToken error for invalid token', async () => {
    const response = await supertest(server)
      .post(route)
      .send({ authToken: 'invalid_token' })

    expect(response.status).toBe(498)
    expect(response.body.message).toBe('Token is not valid')
  })
})
