import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { knexResourceTestDataUpdated } from '../mocks/resources'
import { knexResourceGetSchema } from '../../schemas/resource/resourceGetSchema'
import db from '../../db/knex'
import { Category, Resource, User } from '../../db/knexTypes'

let testResource: Resource
let user: User | null
beforeAll(async () => {
  const testCategory = (await db('category')
    .where({
      slug: testCategoryData.slug,
    })
    .first()) as Category

  user = await db('user')
    .where({
      id: testUserData.user.id,
    })
    .first()

  const testResourceData = {
    ...knexResourceTestDataUpdated[0],
    user_id: user?.id,
    category_id: testCategory.id,
  }

  testResource = await db('resource').insert(testResourceData).returning('id')
})

afterAll(async () => {
  await db('resource').where({ id: knexResourceTestDataUpdated[0].id }).del()
})

describe('Testing resource/id GET endpoint', () => {
  it('should return a resource with a valid id belonging to one', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.resources}/${testResource[0].id}`
    )
    expect(response.status).toBe(200)
    expect(() => knexResourceGetSchema.parse(response.body)).not.toThrow()
  })

  it('should return a 404 for a valid id belonging to no resource', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.resources}/cli1g2ovc555etua0idayvvxw`
    )
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Resource not found')
  })
  it('should return 400 if no valid id is given', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.resources}/something-else-invalid`
    )
    expect(response.status).toBe(400)
  })
})
