import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import cuid from 'cuid'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { knexResourceTestDataUpdated } from '../mocks/resources'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import { Category, KnexResource, User } from '../../db/knexTypes'
import db from '../../db/knex'
import { categoryFavoriteTest } from '../mocks/category'

const url: string = `${pathRoot.v1.resources}/favorites`
const categorySlug = testCategoryData.slug
let adminUser: User | null
let user: User | null
let userWithNoName: User | null
const testingCartegorySlugMock = 'testing-category'
beforeAll(async () => {
  const testCategory = (await db('category')
    .where({ slug: testCategoryData.slug })
    .first()) as Category
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

  const insertedResources = await db('resource')
    .insert(resourcesToInsert)
    .returning('*')

  const votesToInsert = insertedResources.map((resource) => ({
    resource_id: resource.id,
    user_id: adminUser?.id,
    created_at: new Date(),
    updated_at: new Date(),
    vote: 1,
  }))
  await db('category').insert(categoryFavoriteTest)
  await db('vote').insert(votesToInsert)

  const topicCategoryId = await db('category')
    .where({ slug: testingCartegorySlugMock })
    .returning('id')
    .first()

  const topicToInsert = {
    id: cuid(),
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

  const topicInserts = insertedResources.flatMap((resource) =>
    topicWithSlug.map((topic) => ({
      resource_id: resource.id,
      topic_id: topic.id,
    }))
  )

  const favoriteInserts = insertedResources.map((resource) => ({
    resource_id: resource.id,
    user_id: adminUser?.id,
    created_at: new Date(),
  }))

  await Promise.all([
    db('topic_resource').insert(topicInserts),
    db('favorites').insert(favoriteInserts),
  ])
  const newId = cuid()
  const resourceTest4 = {
    id: newId,
    title: 'test-resource-4-blogs',
    slug: 'test-resource-4-blogs',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resource_type: KnexResource.BLOG,
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

  const validResourceIds = await db.raw(
    `SELECT id FROM resource WHERE id = ANY(?)`,
    [insertedResources.map((resource) => resource.id)]
  )
  const validIdsSet = new Set(
    validResourceIds.rows.map((row: { id: any }) => row.id)
  )
  const topicsToInsert = insertedResources
    .filter((resource) => validIdsSet.has(resource.id))
    .flatMap((resource) =>
      topicWithSlug.map((topic) => ({
        resource_id: resource.id,
        topic_id: topic.id,
      }))
    )
  await db('topic_resource').insert(topicsToInsert).onConflict().ignore()
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
  await db('category').whereNot({ slug: testCategoryData.slug }).del()
})

describe('Testing GET resource/favorites/:categorySlug?', () => {
  it('Should respond 200 status with category param', async () => {
    const response = await supertest(server)
      .get(`${url}/${categorySlug}`)
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

  it('Should return favorites as an array of objects.', async () => {
    const response = await supertest(server)
      .get(`${url}/${categorySlug}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
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
          resource_type: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          user: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
          isAuthor: expect.any(Boolean),
          vote_count: expect.objectContaining({
            upvote: expect.any(Number),
            downvote: expect.any(Number),
            total: expect.any(Number),
            user_vote: expect.any(Number),
          }),
          topics: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              slug: expect.any(String),
              category_id: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.any(String),
            }),
          ]),
        }),
      ])
    )
    response.body.forEach((resource: { vote_count: { user_vote: any } }) => {
      expect([-1, 0, 1]).toContain(resource.vote_count.user_vote)
    })
  })

  it('If the user voted a favorite resource, it should be reflected on the response object', async () => {
    const testFavoriteVoteResource = await db('resource')
      .where({
        slug: 'test-resource-1-blog',
      })
      .first()
    await db('vote')
      .insert({
        user_id: adminUser!.id,
        resource_id: testFavoriteVoteResource!.id,
        vote: 1,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .onConflict(['user_id', 'resource_id'])
      .merge({
        vote: 1,
        updated_at: new Date(),
      })
    const response = await supertest(server)
      .get(`${url}/${testFavoriteVoteResource!.slug}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          vote_count: expect.objectContaining({
            upvote: 1,
            downvote: 0,
            total: 1,
            user_vote: 1,
          }),
        }),
      ])
    )
  })
  it('If a user favorited his own created resources, it should be reflected as author', async () => {
    const resourceToFavorite = await db('resource')
      .where({ slug: 'test-resource-1-blog' })
      .first()
    await db('category')
      .where({
        id: resourceToFavorite?.category_id,
      })
      .returning('*')
    await db('favorites')
      .insert({
        user_id: user?.id,
        resource_id: resourceToFavorite?.id,
        created_at: new Date(),
      })
      .returning('*')
    const response = await supertest(server)
      .get(`${url}/testing-category`)
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
