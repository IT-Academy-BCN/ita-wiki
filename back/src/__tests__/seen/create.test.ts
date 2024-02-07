import supertest from 'supertest'
import { expect, describe, beforeAll, afterAll, it, afterEach } from 'vitest'
import { Category, Resource, User } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { resourceTestData } from '../mocks/resources'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'

let testResource: Resource
const uri = `${pathRoot.v1.seen}/`
let user: User | null
beforeAll(async () => {
  const testCategory = (await prisma.category.findUnique({
    where: { slug: 'testing' },
  })) as Category
  user = await prisma.user.findFirst({
    where: { id: testUserData.user.id },
  })
  const testResourceData = {
    ...resourceTestData[0],
    user: { connect: { id: user?.id } },
    category: { connect: { id: testCategory.id } },
  }
  testResource = await prisma.resource.create({
    data: testResourceData,
  })
})

afterAll(async () => {
  await prisma.viewedResource.deleteMany({ where: {} })
  await prisma.resource.deleteMany({
    where: { user: { id: user?.id } },
  })
})

afterEach(async () => {
  await prisma.viewedResource.deleteMany({ where: {} })
})
describe('Testing viewed resource creation endpoint', () => {
  it('should mark a resource as viewed', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.seen}/${testResource.id}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    const viewedResources = await prisma.viewedResource.findMany({
      where: {
        user: { id: testUserData.admin.id },
        resourceId: testResource.id,
      },
    })
    expect(response.status).toBe(204)
    expect(viewedResources.length).toBeGreaterThanOrEqual(1)
  })

  it('should not create duplicate entries for viewed resources', async () => {
    const response = await supertest(server)
      .post(`${uri + testResource.id}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(response.statusCode).toBe(204)
    const secondResponse = await supertest(server)
      .post(`${uri + testResource.id}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(secondResponse.statusCode).toBe(204)
    const viewedResources = await prisma.viewedResource.findMany({
      where: {
        user: { id: testUserData.admin.id },
        resourceId: testResource.id,
      },
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
      const response = await supertest(server).post(`${uri + testResource.id}`)
      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Missing token')
    })

    it('Check invalid token', async () => {
      checkInvalidToken(`${uri + testResource.id}`, 'post')
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
