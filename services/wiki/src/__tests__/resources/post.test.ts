import supertest from 'supertest'
import { expect, describe, beforeAll, afterAll, test } from 'vitest'
import cuid from 'cuid'
import { server, testCategoryData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import db from '../../db/knex'
import { KnexResource } from '../../db/knexTypes'

let topicIds: string[] = []

beforeAll(async () => {
  topicIds = (await db('topic').select('id')).map((topic) => topic.id)
})

afterAll(async () => {
  await db('topic_resource')
    // eslint-disable-next-line func-names
    .whereIn('resource_id', function () {
      this.select('id').from('resource').where({ slug: 'test-resource' })
    })
    .del()
  await db('resource').where({ slug: 'test-resource' }).del()
})
describe('Testing resource creation endpoint', async () => {
  const category = await db('category')
    .where({ slug: testCategoryData.slug })
    .first()

  const newResource = {
    id: cuid(),
    title: 'Test Resource',
    description: 'This is a new resource',
    url: 'https://example.com/resource',
    resource_type: KnexResource.BLOG,
    category_id: category?.id,
    topics: topicIds,
  }
  test('should create a new resource with topics', async () => {
    newResource.topics = topicIds
    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(newResource)
    expect(response.status).toBe(204)
  })

  test('should fail without topics', async () => {
    newResource.topics = []
    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(newResource)
    expect(response.status).toBe(422)
  })

  test('should fail with wrong resource type', async () => {
    const id2 = cuid()
    const invalidResource = {
      id: id2,
      title: 'Invalid Resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resource_type: 'INVALIDE-RESOURCE',
      topics: topicIds,
    }

    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(invalidResource)
    expect(response.status).toBe(400)
    expect(response.body.message[0].received).toBe('INVALIDE-RESOURCE')
  })

  test('Should return error 401 if no token is provided', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .send(newResource)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  checkInvalidToken(`${pathRoot.v1.resources}`, 'post', newResource)
})
