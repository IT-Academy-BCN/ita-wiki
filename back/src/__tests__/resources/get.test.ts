import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'
import { pathRoot } from '../../routes/routes'

describe('Testing resources get endpoint', () => {
  test('should get all resources by resourceType ', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ type: 'BLOG' })
      
      expect(response.status).toBe(200)
      expect(response.body.resources.length).toBeGreaterThanOrEqual(2)
      response.body.resources.map((resource : any) => expect(resource.resourceType).toBe('BLOG'))
  })

  test('should fail with wrong resourceType', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ type: 'WRONG TYPE' })
      
      expect(response.status).toBe(500)
  })

  test('should get all resources by topic ', async () => {

    const topicName = 'Listas'

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ topic: topicName })
      
      expect(response.status).toBe(200)
      expect(response.body.resources.length).toBeGreaterThanOrEqual(2)

      response.body.resources.forEach((resource : any) => {
        expect(
          resource.topics.map((t : any) => t.topic.name)
        ).toContain(topicName)
      })
  })

  test('should fail without a valid topic', async () => {

    const topicName = 'This topic does not exist'

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ topic: topicName })
      
      expect(response.status).toBe(200)
      expect(response.body.resources.length).toBe(0)
  })

  test('should get all resources by type and topic ', async () => {
    const topicName = 'Listas'

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ topic: topicName })
      
      expect(response.status).toBe(200)
      expect(response.body.resources.length).toBeGreaterThanOrEqual(2)

      response.body.resources.forEach((resource : any) => {
        expect(
          resource.topics.map((t : any) => t.topic.name)
        ).toContain(topicName)
        expect(resource.resourceType).toBe('BLOG')
      })

  })

  test('should get all resources', async () => {

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({})
      
      expect(response.status).toBe(200)

      const titles = response.body.resources.map((resource : any) => resource.title)

      expect(titles).toContain("My resource in React")
      expect(titles).toContain("My resource in Node")
      expect(titles).toContain("My second resource in React")
      expect(titles).toContain("My resource in Javascript")
  })
})
