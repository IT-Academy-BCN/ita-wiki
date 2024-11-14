import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { Category, User, Prisma } from '@prisma/client'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'

let user: User | null
let userWithNoName: User | null

beforeAll(async () => {
  // Buscar categoria por slug
  const testCategory = (await prisma.category.findUnique({
    where: { slug: testCategoryData.slug },
  })) as Category
  // Busco usuario
  user = await prisma.user.findFirst({
    where: { id: testUserData.user.id },
  })
  // busco usuario sin nombre
  userWithNoName = await prisma.user.findFirst({
    where: { id: testUserData.userWithNoName.id },
  })

  // recursos con user
  const testResourcesWithUser = resourceTestData.map((resource) => {
    return {
      ...resource,
      userId: user!.id,
      categoryId: testCategory.id,
    }
  })

  // creo recurso sin user
  const resourceTest4: Omit<
    Prisma.ResourceCreateArgs['data'],
    'userId' | 'categoryId'
  > = {
    title: 'test-resource-4-blog',
    slug: 'test-resource-4-blog',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resourceType: 'BLOG',
  }

  const testResourcesWithNoUserName = {
    ...resourceTest4,
    userId: userWithNoName!.id,
    categoryId: testCategory.id,
  }

  // junto los 4 recursos
  testResourcesWithUser.push(testResourcesWithNoUserName)

  // creo 4 recursos
  await prisma.resource.createMany({
    data: testResourcesWithUser,
  })

  // busco un recurso por slug
  const testResource = await prisma.resource.findUnique({
    where: { slug: resourceTestData[0].slug },
  })

  // creo favorito entre recurso y usuario
  await prisma.favorites.create({
    data: {
      resourceId: testResource!.id,
      userId: user!.id,
    },
  })
  // agrego un voto al recurso donde coincide usuario y recurso
  await prisma.vote.upsert({
    where: {
      userId_resourceId: {
        userId: user!.id,
        resourceId: testResource!.id,
      },
    },
    update: {
      vote: 1,
    },
    create: {
      userId: user!.id,
      resourceId: testResource!.id,
      vote: 1,
    },
  })
})

afterAll(async () => {
  // borro favoritos del usuario
  await prisma.favorites.deleteMany({
    where: { user: { id: user?.id } },
  })
  // borro favoritos del usuario sin nombre
  await prisma.favorites.deleteMany({
    where: { user: { id: userWithNoName?.id } },
  })
  // borro votos y recursos del usuario
  await prisma.vote.deleteMany({})
  await prisma.resource.deleteMany({
    where: { user: { id: user?.id } },
  })

  // borro recursos sin usuario
  await prisma.resource.deleteMany({
    where: { user: { id: userWithNoName?.id } },
  })
})

describe('Testing resources/me endpoint', () => {
  it('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.resources}/me`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })

  checkInvalidToken(`${pathRoot.v1.resources}/me`, 'get')

  it('User with no resources posted returns empty array.', async () => {
    // User admin has no posted resources
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBe(0)
  })

  it('Should return resources from user', async () => {
    // Normal user has a resource created for this test.
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', [`authToken=${authToken.user}`])

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  it.only('Given a valid category slug, should return resources related to that category', async () => {
    const categorySlug = testCategoryData.slug
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .query({ categorySlug })
    console.log('response body', response.body)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  it('If the user voted and favorited one of its own created resources, it should be reflected on the response object', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', [`authToken=${authToken.user}`])

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          voteCount: expect.objectContaining({
            upvote: 1,
            downvote: 0,
            total: 1,
            userVote: 1,
          }),
          isFavorite: true,
          user: expect.objectContaining({
            name: expect.any(String),
            id: user?.id,
          }),
        }),
      ])
    )
  })
})
