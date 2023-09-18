import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { Favorites, User, Resource } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'

describe('Testing resource modify endpoint', () => {
  beforeAll(async () => {
    const user = (await prisma.user.findUnique({
      where: { email: 'testingUser@user.cat' },
    })) as User

    ;(await prisma.resource.create({
      data: {
        title: 'test-patch-resource',
        slug: 'test-patch-resource',
        description: 'Test patch resource',
        url: 'https://test.patch',
        resourceType: 'BLOG',
        status: 'SEEN',
        userId: user.id,
      },
    })) as Resource
  })

  afterAll(async () => {
    const user = (await prisma.user.findUnique({
      where: { email: 'testingUser@user.cat' },
    })) as User
    const resource = (await prisma.resource.findUnique({
      where: { slug: 'test-patch-resource' },
    })) as Resource

    await prisma.favorites.deleteMany({
      where: { userId: user.id, resourceId: resource!.id },
    })
    await prisma.resource.deleteMany({
      where: { user: { dni: testUserData.user.dni } },
    })
  })

  test('should create a favorite', async () => {
    const resource = await prisma.resource.findUnique({
      where: { slug: 'test-patch-resource' },
    })
    const newResource = {
      id: resource!.id,
    }

    const response = await supertest(server)
      .put(`${pathRoot.v1.favorites}/`)
      .set('Cookie', authToken.user)
      .send(newResource!)
    const favorite = (await prisma.favorites.findFirst({
      where: { resourceId: resource!.id },
    })) as Favorites

    expect(favorite).not.toBe(null)
    expect(favorite.resourceId).toBe(resource!.id)
    expect(response.status).toBe(204)
  })

  test.only('should delete a favorite if already exists', async () => {
    const resource = (await prisma.resource.findFirst({
      where: { slug: 'test-patch-resource' },
    })) as Resource
    const user = (await prisma.user.findUnique({
      where: { email: 'testingUser@user.cat' },
    })) as User
    ;(await prisma.favorites.create({
      data: { resourceId: resource.id, userId: user.id },
    })) as Favorites

    const response = await supertest(server)
      .put(`${pathRoot.v1.favorites}/`)
      .set('Cookie', authToken.user)
      .send(resource!)

    const favorite = await prisma.favorites.findFirst({
      where: { resourceId: resource.id },
    })

    expect(favorite).toBe(null)
    expect(response.status).toBe(204)
  })

  test('should accept string only', async () => {
    const newResource = {
      id: 23,
      title: 23,
      slug: 'test-resource-1-blog',
      description: 'Lorem ipsum blog',
      url: 'https://sample.com',
      resourceType: 'BLOG',
    }
    const response = await supertest(server)
      .put(`${pathRoot.v1.favorites}/`)
      .set('Cookie', authToken.user)
      .send(newResource!)
    expect(response.status).toBe(400)
  })
})
