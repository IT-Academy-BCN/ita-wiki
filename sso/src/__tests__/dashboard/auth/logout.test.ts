import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'

describe('Testing authentication endpoint', () => {
  it('should succeed ', async () => {
    const agent = supertest.agent(server)
    await agent
      .post(`${pathRoot.v1.dashboard.auth}/login`)
      .send({
        dni: testUserData.admin.dni,
        password: testUserData.admin.password,
      })
      .expect(204)
    await agent
      .post(`${pathRoot.v1.dashboard.auth}/logout`)
      .expect(204)
      .expect((res) => {
        const cookies = res.headers['set-cookie']
        expect(cookies, 'No cookies set').toBeTruthy()
        const authTokenCookie = cookies.find((cookie) =>
          cookie.startsWith('authToken=')
        )
        expect(
          authTokenCookie,
          'authToken cookie not properly deleted'
        ).toMatch(/expires=/)
        const refreshTokenCookie = cookies.find((cookie) =>
          cookie.startsWith('refreshToken=')
        )
        expect(
          refreshTokenCookie,
          'refreshToken cookie not properly deleted'
        ).toMatch(/expires=/)
      })
  })
})
