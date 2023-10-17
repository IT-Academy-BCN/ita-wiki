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
  it(`should return 498 for ${method.toUpperCase()} ${endpoint} without token`, async () => {
    let response

    switch (method) {
      case 'get':
        response = await requestWithoutToken
          .get(endpoint)
          .set('Cookie', `token=invalidToken`)
        break
      case 'post':
        response = body
          ? await requestWithoutToken
              .post(endpoint)
              .set('Cookie', `token=invalidToken`)
              .send(body)
          : await requestWithoutToken
              .post(endpoint)
              .set('Cookie', `token=invalidToken`)
        break
      case 'put':
        response = body
          ? await supertest(server)
              .put(endpoint)
              .set('Cookie', `token=invalidToken`)
              .send(body)
          : await supertest(server)
              .put(endpoint)
              .set('Cookie', `token=invalidToken`)
        break
      case 'patch':
        response = body
          ? await supertest(server)
              .patch(endpoint)
              .set('Cookie', `token=invalidToken`)
              .send(body)
          : await supertest(server)
              .patch(endpoint)
              .set('Cookie', `token=invalidToken`)
        break
      default:
        throw new Error(`Unsupported method: ${method}`)
    }

    expect(response.status).toBe(498)
    expect(response.body.message).toBe('Token is not valid')

    const cookieHeader = response.headers['set-cookie']
    expect(cookieHeader).toBeDefined()

    const tokenCookie = cookieHeader.find((header: string) =>
      header.startsWith('token=')
    )
    expect(tokenCookie).toBe(
      'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )
  })
}
