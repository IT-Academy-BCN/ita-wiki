import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'

describe('Testing types endpoint', () => {
  test('Should respond OK status ', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.types}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toEqual(
      expect.arrayContaining(['BLOG', 'VIDEO', 'TUTORIAL'])
    )

    const responseTypes = response.body
    const expectedTypes = ['BLOG', 'VIDEO', 'TUTORIAL']

    expect(responseTypes).toEqual(expect.arrayContaining(expectedTypes))
  })
})
