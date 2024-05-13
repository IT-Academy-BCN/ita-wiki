import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'

describe('Testing authentication endpoint', () => {
  test('should succeed', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.auth}/logout`)
    const cookies = response.header['set-cookie']

    expect(cookies[0]).toMatch(/authToken=;/)
    expect(cookies[1]).toMatch(/refreshToken=;/)
    expect(response.status).toBe(204)
  })
})
