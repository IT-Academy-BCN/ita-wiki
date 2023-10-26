import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import jwt, { Secret } from 'jsonwebtoken'
import { Category } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { prisma } from '../../prisma/client'
import { resourceTestData } from '../mocks/resources'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'

const url: string = `${pathRoot.v1.resources}/favorites`
const categorySlug = 'testing'
const invalidUserToken = jwt.sign(
  { userId: 'invalid' },
  process.env.JWT_KEY as Secret,
  {
    expiresIn: '1h',
  }
)

beforeAll(async () => {
  const testCategory = (await prisma.category.findUnique({
    where: { slug: 'testing' },
  })) as Category
  const testResources = resourceTestData.map((testResource) => ({
    ...testResource,
    user: { connect: { dni: testUserData.user.dni } },
    topics: {
      create: [{ topic: { connect: { slug: 'testing' } } }],
    },
    favorites: {
      create: [{ user: { connect: { dni: testUserData.admin.dni } } }],
    },
    category: { connect: { id: testCategory.id } },
  }))

  await prisma.$transaction(
    testResources.map((resource) => prisma.resource.create({ data: resource }))
  )
})

afterAll(async () => {
  await prisma.topicsOnResources.deleteMany({
    where: { topic: { slug: 'testing' } },
  })
  await prisma.favorites.deleteMany({
    where: { user: { dni: testUserData.admin.dni } },
  })
  await prisma.resource.deleteMany({
    where: { user: { dni: testUserData.user.dni } },
  })
})

describe('Testing GET resource/favorites/:categorySlug?', () => {
  test('Should respond 200 status with category param', async () => {
    const response = await supertest(server)
      .get(`${url}/:${categorySlug}`)
      .set('Cookie', authToken.admin)
    expect(response.status).toBe(200)
  })
  test('Should respond 200 status without category param', async () => {
    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', authToken.admin)
    expect(response.status).toBe(200)
  })
  test('Should respond 401 status without token', async () => {
    const response = await supertest(server).get(`${url}/${categorySlug}`)
    expect(response.status).toBe(401)
  })
  test('Should respond 404 status without valid userId', async () => {
    const response = await supertest(server)
      .get(`${url}/${categorySlug}`)
      .set('Cookie', `token=${invalidUserToken}`)
    expect(response.status).toBe(404)
  })

  checkInvalidToken(`${url}/${categorySlug}`, 'get')

  test('Should return favorites as an array of objects.', async () => {
    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', authToken.admin)

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          slug: expect.any(String),
          description: expect.any(String),
          url: expect.any(String),
          resourceType: expect.any(String),
          userId: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          voteCount: expect.objectContaining({
            upvote: expect.any(Number),
            downvote: expect.any(Number),
            total: expect.any(Number),
          }),
        }),
      ])
    )
  })
})
