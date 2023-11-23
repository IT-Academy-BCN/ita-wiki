import supertest from 'supertest'
import { expect, it, describe } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'

const route = `${pathRoot.v1.itinerary}`

describe('Testing validate token endpoint', () => {
  it('should respond with all itineraries', async () => {
    const response = await supertest(server).get(route)
    expect(response.status).toBe(200)
  })
})
