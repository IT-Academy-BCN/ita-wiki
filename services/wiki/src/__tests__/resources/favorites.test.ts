import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import cuid from 'cuid'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { knexResourceTestDataUpdated } from '../mocks/resources'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import { Category, User } from '../../db/knexTypes'
import db from '../../db/knex'

const url: string = `${pathRoot.v1.resources}/favorites`
const categorySlug = testCategoryData.slug
console.log('category slug: ', categorySlug)
let adminUser: User | null
let user: User | null
let userWithNoName: User | null
const testingCartegorySlugMock = 'testing-category'
beforeAll(async () => {
  const testCategory = (await db('category')
    .where({ slug: testCategoryData.slug })
    .first()) as Category
  console.log('testCategory: ', testCategory)
  user = (await db('user').where({ id: testUserData.user.id }).first()) as User
  adminUser = (await db('user')
    .where({ id: testUserData.admin.id })
    .first()) as User
  userWithNoName = (await db('user')
    .where({ id: testUserData.userWithNoName.id })
    .first()) as User
  const resourcesToInsert = knexResourceTestDataUpdated.map((testResource) => ({
    ...testResource,
    user_id: user?.id,
    category_id: testCategory.id,
  }))
  console.log('resources to insert: ', resourcesToInsert)

  const insertedResources = await db('resource')
    .insert(resourcesToInsert)
    .returning('*')
  console.log('inserted resources: ', insertedResources)

  const topicCategoryId = await db('category')
    .where({ slug: testingCartegorySlugMock })
    .returning('id')
    .first()
  console.log('topic category id: ', topicCategoryId)

  const topicToInsert = {
    id: '1fr3zflwq341178x93ohv8xy9',
    name: 'Testing',
    slug: testingCartegorySlugMock,
    category_id: topicCategoryId.id,
    created_at: new Date(),
    updated_at: new Date(),
  }
  await db('topic').insert(topicToInsert)
  const topicWithSlug = await db('topic').where({
    slug: testingCartegorySlugMock,
  })
  console.log('topic with slug: ', topicWithSlug)

  const topicInserts = insertedResources.flatMap((resource) =>
    topicWithSlug.map((topic) => ({
      resource_id: resource.id,
      topic_id: topic.id,
    }))
  )
  console.log('topic inserts successfully')

  const favoriteInserts = insertedResources.map((resource) => ({
    resource_id: resource.id,
    user_id: adminUser?.id,
  }))

  await Promise.all([
    db('topic_resource').insert(topicInserts),
    db('favorites').insert(favoriteInserts),
  ])

  const resourceTest4 = {
    id: cuid(),
    title: 'test-resource-4-blog',
    slug: 'test-resource-4-blog',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resource_type: 'BLOG',
    created_at: new Date(),
    updated_at: new Date(),
  }

  const testResourceDataWithNoName = {
    ...resourceTest4,
    user_id: userWithNoName?.id,
    category_id: testCategory.id,
  }

  const [insertedResourceId] = await db('resource')
    .insert(testResourceDataWithNoName)
    .returning('id')
  console.log('insertedResourceId', insertedResourceId)

  const validResourceIds = await db.raw(
    `SELECT id FROM resource WHERE id = ANY(?)`,
    [insertedResources.map((resource) => resource.id)]
  )

  const validIdsSet = new Set(
    validResourceIds.rows.map((row: { id: any }) => row.id)
  )
  console.log('valid ids set', validIdsSet)
  const topicsToInsert = insertedResources
    .filter((resource) => validIdsSet.has(resource.id))
    .flatMap((resource) =>
      topicWithSlug.map((topic) => ({
        resource_id: resource.id,
        topic_id: topic.id,
      }))
    )
  console.log('topics to insert:', topicsToInsert)
  await db('topic_resource').insert(topicsToInsert).onConflict().ignore()
  console.log('inserted resource', insertedResourceId)
  await db('favorites').insert({
    resource_id: insertedResourceId.id,
    user_id: adminUser?.id,
  })
  ;(knexResourceTestDataUpdated as any).push(testResourceDataWithNoName)
})

afterAll(async () => {
  await db('topic_resource')
    .leftJoin('topic', 'topic.id', '=', 'topic_resource.topic_id')
    .where({ slug: testingCartegorySlugMock })
    .del()
  await db('topic').where({ slug: testingCartegorySlugMock }).del()
  await db('favorites')
    .whereIn('user_id', [adminUser!.id, user!.id, userWithNoName!.id])
    .del()
  await db('vote').del()
  await db('resource').where({ user_id: user!.id }).del()
  await db('resource').where({ user_id: userWithNoName!.id }).del()
})

describe('Testing GET resource/favorites/:categorySlug?', () => {
  it('Should respond 200 status with category param', async () => {
    const response = await supertest(server)
      .get(`${url}/:${categorySlug}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(response.status).toBe(200)
  })
  it('Should respond 200 status without category param', async () => {
    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(response.status).toBe(200)
  })
  it('Should respond 401 status without token', async () => {
    const response = await supertest(server).get(`${url}/${categorySlug}`)
    expect(response.status).toBe(401)
  })

  checkInvalidToken(`${url}/${categorySlug}`, 'get')

  it.only('Should return favorites as an array of objects.', async () => {
    const response = await supertest(server)
      .get(`${url}/${categorySlug}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    console.log('test response', response.body)
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          user: expect.objectContaining({
            name: expect.any(String),
          }),
          isAuthor: expect.any(Boolean),
          voteCount: expect.objectContaining({
            upvote: expect.any(Number),
            downvote: expect.any(Number),
            total: expect.any(Number),
            userVote: expect.any(Number),
          }),
          topics: expect.arrayContaining([
            expect.objectContaining({
              topic: expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),
                slug: expect.any(String),
                categoryId: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              }),
            }),
          ]),
        }),
      ])
    )
    response.body.forEach((resource: { voteCount: { userVote: any } }) => {
      expect([-1, 0, 1]).toContain(resource.voteCount.userVote)
    })
  })
  it('If the user voted a favorite resource, it should be reflected on the response object', async () => {
    const testFavoriteVoteResource = await prisma.resource.findUnique({
      where: { slug: 'test-resource-1-blog' },
    })

    await prisma.vote.upsert({
      where: {
        userId_resourceId: {
          userId: adminUser!.id,
          resourceId: testFavoriteVoteResource!.id,
        },
      },
      update: {
        vote: 1,
      },
      create: {
        userId: adminUser!.id,
        resourceId: testFavoriteVoteResource!.id,
        vote: 1,
      },
    })
    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          voteCount: expect.objectContaining({
            upvote: 1,
            downvote: 0,
            total: 1,
            userVote: 1,
          }),
        }),
      ])
    )
  })
  it('If a user favorited his own created resources, it should be reflected as author', async () => {
    const resourceToFavorite = await prisma.resource.findUnique({
      where: { slug: 'test-resource-1-blog' },
    })
    await prisma.favorites.create({
      data: {
        userId: user!.id,
        resourceId: resourceToFavorite!.id,
      },
    })

    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', [`authToken=${authToken.user}`])

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          isAuthor: true,
          user: expect.objectContaining({
            name: testUserData.user.name,
            id: testUserData.user.id,
          }),
        }),
      ])
    )
  })
})
