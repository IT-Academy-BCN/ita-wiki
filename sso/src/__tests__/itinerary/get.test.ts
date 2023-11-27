import supertest from 'supertest'
import { expect, it, describe } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { itineraryGetSchema } from '../../schemas/itinerary/itineraryGetSchema'

const route = `${pathRoot.v1.itinerary}`

describe('Testing validate token endpoint', () => {
  it('should respond with all itineraries', async () => {
    const response = await supertest(server).get(route)
    expect(response.status).toBe(200)
    expect(() => itineraryGetSchema.parse(response.body)).not.toThrow()
    expect(response.body.length).toBe(6)
  })
})
