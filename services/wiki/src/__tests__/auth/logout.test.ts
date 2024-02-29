import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'

describe('Testing authentication endpoint', () => {
  test('should succeed', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.auth}/logout`)
    expect(response.status).toBe(204)
  })
})
