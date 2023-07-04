import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { Topic, User } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'

describe('Testing resource modify endpoint', () => {
  let testTopic: Topic

  beforeAll(async () => {
    testTopic = (await prisma.topic.findUnique({
      where: { slug: 'testing' },
    })) as Topic

    const user = (await prisma.user.findUnique({
      where: { email: 'testingUser@user.cat' },
    })) as User

    const resource = await prisma.resource.create({
      data: {
        title: 'test-patch-resource',
        slug: 'test-patch-resource',
        description: 'Test patch resource',
        url: 'https://test.patch',
        resourceType: 'BLOG',
        status: 'SEEN',
        userId: user.id,
      },
    })

    await prisma.topicsOnResources.createMany({
      data: {
        resourceId: resource.id,
        topicId: testTopic.id,
      },
    })
  })

  afterAll(async () => {
    await prisma.topicsOnResources.deleteMany({
      where: { topic: { id: testTopic.id } },
    })
    await prisma.resource.deleteMany({
      where: { user: { dni: testUserData.user.dni } },
    })
  })

  test.only('resource owner should be the same as userId sending the modify petition', async () => {
    const resource = await prisma.resource.findUnique({
      where: { slug: 'test-patch-resource' },
    })

    const newResource = {
      id: resource!.id,
    }

    const response = await supertest(server)
      .patch(`${pathRoot.v1.resources}/`)
      .set('Cookie', authToken.admin)
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
      .put(`${pathRoot.v1.resources}/`)
      .set('Cookie', authToken.user)
      .send(newResource)
    expect(response.status).toBe(400)
  })

  // test('should modify topics', async () => {
  //     let newResource = await prisma.resource.findUnique({
  //         where: { slug: 'test-resource-1-blog' },
  //         include: { topics: true }
  //     })

  //     let newTopic = await prisma.topic.findFirst({
  //         where: { slug: 'listas' }
  //     })
  //     let lastRes = {
  //         id: newResource!.id,
  //         title: null,
  //         description: null,
  //         url: null,
  //         topics: newTopic!.id,
  //         resourceType: null,
  //     }
  //     console.log('NEW RESOURCE topic::::::', newResource?.topics)
  //     console.log('NEW TOPIC:::', newTopic!)
  //     console.log('LAST RES TOPICS', lastRes.topics)
  //     const response = await supertest(server)
  //         .put(`${pathRoot.v1.resources}/`)
  //         .set('Cookie', authToken.user)
  //         .send(lastRes!)

  //     const compare = await prisma.resource.findUnique({
  //         where: { slug: 'test-resource-1-blog' },
  //         include: { topics: true }
  //     })
  //     const topicOnResource = await prisma.topicsOnResources.findFirst({
  //         where: { resourceId: newResource!.id }
  //     })

  //     expect(compare!.topics[0].topicId).toBe(topicOnResource!.topicId)
  //     expect(response.status).toBe(204)
  // })

  test('should modify a resource with new Title', async () => {
    const newTitle = 'test tres'
    const resource = await prisma.resource.findUnique({
      where: { slug: 'test-resource-1-blog' },
      include: { topics: true },
    })

    const newResource = {
      id: resource!.id,
      title: newTitle,
      slug: null,
      description: null,
      url: null,
      resourceType: null,
    }
    const response = await supertest(server)
      .put(`${pathRoot.v1.resources}/`)
      .set('Cookie', authToken.user)
      .send(newResource!)
    const lastResource = await prisma.resource.findUnique({
      where: { id: newResource!.id },
    })
    expect(lastResource?.title).toBe(newTitle)
    expect(response.status).toBe(204)
  })
})
