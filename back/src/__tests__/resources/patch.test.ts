import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { Resource, Category, Topic, User } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'

describe('Testing resource modify endpoint', () => {
  let testTopic: Topic
  let resource: Resource
  beforeAll(async () => {
    testTopic = (await prisma.topic.findUnique({
      where: { slug: 'testing' },
    })) as Topic

    const user = (await prisma.user.findFirst({
      where: { id: testUserData.user.id },
    })) as User

    const category = (await prisma.category.findUnique({
      where: { slug: 'testing' },
    })) as Category

    resource = await prisma.resource.create({
      data: {
        title: 'test-patch-resource',
        slug: 'test-patch-resource',
        description: 'Test patch resource',
        url: 'https://test.patch',
        resourceType: 'BLOG',
        userId: user.id,
        categoryId: category.id,
      },
    })
  })

  afterAll(async () => {
    await prisma.topicsOnResources.deleteMany({
      where: { topic: { id: testTopic.id } },
    })
    await prisma.resource.deleteMany({
      where: { user: { id: testUserData.user.id } },
    })
  })

  test('resource owner should be the same as userId sending the modify petition', async () => {
    const testResource = await prisma.resource.findUnique({
      where: { slug: 'test-patch-resource' },
    })

    const newResource = {
      id: testResource!.id,
    }

    const response = await supertest(server)
      .patch(`${pathRoot.v1.resources}/`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(newResource!)
    expect(response.status).toBe(401)
  })

  test('should accept string or null only', async () => {
    const newResource = {
      id: 'cljfiayg80000ungsabdmxsaf',
      title: 23,
      slug: 'test-resource-1-blog',
      description: 'Lorem ipsum blog',
      url: 'https://sample.com',
      resourceType: 'BLOG',
    }
    const response = await supertest(server)
      .patch(`${pathRoot.v1.resources}/`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(newResource)
    expect(response.status).toBe(400)
  })

  test('should modify topics', async () => {
    const newTopic = await prisma.topic.findUnique({
      where: { slug: 'testing' },
    })
    const newResource = await prisma.resource.findUnique({
      where: { slug: 'test-patch-resource' },
      include: { topics: true },
    })
    const lastRes = {
      id: newResource!.id,
      topicId: newTopic!.id,
    }
    const response = await supertest(server)
      .patch(`${pathRoot.v1.resources}/`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(lastRes!)

    const compare = await prisma.resource.findUnique({
      where: { slug: 'test-patch-resource' },
      include: { topics: true },
    })

    const topicOnResource = await prisma.topicsOnResources.findFirst({
      where: { resourceId: newResource!.id },
    })

    expect(compare!.topics[0].topicId).toBe(topicOnResource!.topicId)
    expect(response.status).toBe(204)
  })

  test('should modify a resource with new Title', async () => {
    const newTitle = 'test tres'
    const testresource = await prisma.resource.findUnique({
      where: { slug: 'test-patch-resource' },
      include: { topics: true },
    })

    const newResource = {
      id: testresource!.id,
      title: newTitle,
    }
    const response = await supertest(server)
      .patch(`${pathRoot.v1.resources}/`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(newResource!)
    const lastResource = await prisma.resource.findUnique({
      where: { id: newResource!.id },
    })
    expect(lastResource?.title).toBe(newTitle)
    expect(response.status).toBe(204)
  })
  test('Should return error 401 if no token is provided', async () => {
    const response = await supertest(server)
      .patch(`${pathRoot.v1.resources}`)
      .send({ id: resource.id, tittle: 'New tittle' })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  test('Check invalid token', async () => {
    checkInvalidToken(`${pathRoot.v1.resources}`, 'patch', {
      id: resource.id,
      tittle: 'New tittle',
    })
  })
})
