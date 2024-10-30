import supertest from 'supertest'
import cuid from 'cuid'
import { expect, describe, beforeAll, afterAll, it, afterEach } from 'vitest'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { resourceTestData } from '../mocks/resources'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import db from '../../db/knex'

let testResource: any // Change type to Resource (not prisma)
const uri = `${pathRoot.v1.seen}/`

const testResourceData = {
  ...resourceTestData[1],
  id: cuid(),
  user_id: testUserData.user.id,
  created_at: new Date(),
  updated_at: new Date(),
}

beforeAll(async () => {
  const testCategory = await db('category')
    .where({
      slug: testCategoryData.slug,
    })
    .first()

  testResource = await db('resource')
    .insert({ ...testResourceData, category_id: testCategory.id })
    .returning('id')
})

afterAll(async () => {
  await db('viewed_resource').where({}).del()
  await db('resource')
    .where({
      user_id: testUserData.user.id,
    })
    .del()
})

afterEach(async () => {
  await db('viewed_resource').where({}).del()
})
describe('Testing viewed resource creation endpoint', () => {
  it('should mark a resource as viewed', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.seen}/${testResource[0].id}`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    const viewedResources = await db('viewed_resource').where({
      user_id: testUserData.admin.id,
      resource_id: testResource[0].id,
    })
    expect(response.status).toBe(204)
    expect(viewedResources.length).toBeGreaterThanOrEqual(1)
  })

  it('should not create duplicate entries for viewed resources', async () => {
    const response = await supertest(server)
      .post(`${uri + testResource[0].id}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(response.statusCode).toBe(204)
    const secondResponse = await supertest(server)
      .post(`${uri + testResource[0].id}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(secondResponse.statusCode).toBe(204)

    const viewedResources = await db('viewed_resource').where({
      user_id: testUserData.admin.id,
      resource_id: testResource[0].id,
    })
    expect(viewedResources.length).toBe(1)
  })
  describe('Fail cases', () => {
    it('Should response status code 400 if no valid cuid is provided', async () => {
      const response = await supertest(server)
        .post(`${uri}abc`)
        .set('Cookie', [`authToken=${authToken.admin}`])
      expect(response.status).toBe(400)
      expect(response.body.message[0]).toStrictEqual({
        code: 'invalid_string',
        message: 'Invalid cuid',
        path: ['params', 'resourceId'],
        validation: 'cuid',
      })
    })
    it('Should response status code 401 if no token is provided', async () => {
      const response = await supertest(server).post(
        `${uri + testResource[0].id}`
      )
      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Missing token')
    })

    it('Check invalid token', async () => {
      checkInvalidToken(`${uri + testResource[0].id}`, 'post')
    })

    it('should response status code 404 if resource does not exist', async () => {
      const response = await supertest(server)
        .post(`${uri}clnjyhw7t000008ju4ozndeqi`)
        .set('Cookie', [`authToken=${authToken.admin}`])

      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe('Resource not found')
    })
  })
})
