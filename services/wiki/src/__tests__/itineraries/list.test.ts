import supertest from 'supertest'
import { expect, it, describe } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { mswServer } from '../mocks/mswServer'
import { itinerariesListSchema } from '../../schemas/itinerary/itinerariesListSchema'

// eslint-disable-next-line no-promise-executor-return
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('Testing category GET method', () => {
  it('Should respond OK status and return itineraries as an array. As per seed data, it should not be empty, and contain objects with an id and category name.', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.itinerary}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(() => itinerariesListSchema.parse(response.body)).not.toThrow()
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          slug: expect.any(String),
        }),
      ])
    )
  })
  it(
    'Should fail and respond 503 status if ssoServer is not available',
    async () => {
      mswServer.close()
      await wait(1000)
      const response = await supertest(server).get(`${pathRoot.v1.itinerary}`)

      expect(response.status).toBe(503)
      expect(response.body.message).toBe('Service Unavailable')
    },
    { retry: 3 }
  )
})
