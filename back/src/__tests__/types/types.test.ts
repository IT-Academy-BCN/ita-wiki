import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { RESOURCE_TYPE } from '@prisma/client'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'

describe('Testing types endpoint', () => {
  describe('Testing GET method', () => {
    test('Should respond OK status ', async () => {
      const response = await supertest(server).get(`${pathRoot.v1.types}`)

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.any(String),
          expect.any(String),
          expect.any(String),
        ])
      )
    })
    test('Should include all types defined in RESOURCE_TYPE', async () => {
      const response = await supertest(server).get(`${pathRoot.v1.types}`)

      const responseTypes = response.body
      const expectedTypes = Object.values(RESOURCE_TYPE).map((type) =>
        String(type)
      )

      expect(responseTypes).toEqual(expect.arrayContaining(expectedTypes))
    })
  })
})
