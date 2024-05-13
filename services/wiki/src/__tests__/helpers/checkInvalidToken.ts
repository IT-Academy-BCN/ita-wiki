import { beforeEach, expect, it } from 'vitest'
import supertest from 'supertest'

import { server } from '../globalSetup'

export const checkInvalidToken = (
  endpoint: string,
  method: string,
  body?: string | object
) => {
  let requestWithoutToken: supertest.SuperTest<supertest.Test>
  beforeEach(async () => {
    requestWithoutToken = supertest(server)
  })
  it(`should return 401 for ${method.toUpperCase()} ${endpoint} without token`, async () => {
    let response

    switch (method) {
      case 'get':
        response = await requestWithoutToken
          .get(endpoint)
          .set('Cookie', `authToken=invalidToken`)
        break
      case 'post':
        response = body
          ? await requestWithoutToken
              .post(endpoint)
              .set('Cookie', `authToken=invalidToken`)
              .send(body)
          : await requestWithoutToken
              .post(endpoint)
              .set('Cookie', `authToken=invalidToken`)
        break
      case 'put':
        response = body
          ? await supertest(server)
              .put(endpoint)
              .set('Cookie', `authToken=invalidToken`)
              .send(body)
          : await supertest(server)
              .put(endpoint)
              .set('Cookie', `authToken=invalidToken`)
        break
      case 'patch':
        response = body
          ? await supertest(server)
              .patch(endpoint)
              .set('Cookie', `authToken=invalidToken`)
              .send(body)
          : await supertest(server)
              .patch(endpoint)
              .set('Cookie', `authToken=invalidToken`)
        break
      default:
        throw new Error(`Unsupported method: ${method}`)
    }

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token is not valid')

    const cookieHeader = response.headers['set-cookie']
    expect(cookieHeader).toBeDefined()

    const tokenCookie = cookieHeader.find((header: string) =>
      header.startsWith('authToken=')
    )
    expect(tokenCookie).toBe(
      'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )
  })
}
