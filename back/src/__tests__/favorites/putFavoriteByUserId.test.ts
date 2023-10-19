import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { User, Resource, Category } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { checkInvalidToken } from '../helpers/checkInvalidToken'

describe('Testing resource modify endpoint', async () => {
  const user = (await prisma.user.findUnique({
    where: { email: 'testingUser@user.cat' },
  })) as User

  const req: { id: string } = { id: '' }
  beforeAll(async () => {
    const category = (await prisma.category.findUnique({
      where: { slug: 'testing' },
    })) as Category

    const resource = await prisma.resource.create({
      data: {
        title: 'test-patch-resource',
        slug: 'test-patch-resource',
        description: 'Test patch resource',
        url: 'https://test.patch',
        resourceType: 'BLOG',
        userId: user!.id,
        categoryId: category.id,
      },
    })
    req.id = resource.id
  })

  afterAll(async () => {
    const resource = await prisma.resource.findUnique({
      where: { slug: 'test-patch-resource' },
    })

    await prisma.favorites.deleteMany({
      where: { userId: user!.id, resourceId: resource!.id },
    })
    await prisma.resource.deleteMany({
      where: { user: { dni: testUserData.user.dni } },
    })
  })

  test('should create a favorite', async () => {
    const response = await supertest(server)
      .put(`${pathRoot.v1.favorites}/`)
      .set('Cookie', authToken.user)
      .send(req)

    const favorite = await prisma.favorites.findFirst({
      where: { resourceId: req.id },
    })

    expect(favorite).not.toBe(null)
    expect(favorite?.resourceId).toBe(req.id)
    expect(response.status).toBe(204)
  })

  test('should delete a favorite if already exists', async () => {
    const resource = (await prisma.resource.findFirst({
      where: { slug: 'test-patch-resource' },
    })) as Resource

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

  checkInvalidToken(`${pathRoot.v1.favorites}/`, 'put', req)
})
