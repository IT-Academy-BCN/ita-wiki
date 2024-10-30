import supertest from 'supertest'
import { expect, it, describe, beforeEach, afterEach } from 'vitest'
import { User } from '@prisma/client'
import cuid from 'cuid'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { authToken } from '../mocks/ssoHandlers/authToken'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import db from '../../db/knex'

describe('Testing resource modify endpoint', () => {
  const req: { id: string } = { id: '' }
  let user: User | null
  beforeEach(async () => {
    user = await db('user').where({ id: testUserData.user.id }).first()

    const category = await db('category')
      .where({ slug: testCategoryData.slug })
      .first()

    const testId = cuid()

    const resource = await db('resource').insert(
      {
        id: testId,
        title: 'test-patch-resource',
        slug: 'test-patch-resource',
        description: 'Test patch resource',
        url: 'https://test.patch',
        resource_type: 'BLOG',
        user_id: user!.id,
        updated_at: new Date(),
        category_id: category!.id,
      },
      ['id']
    )

    console.log('resource', resource)

    req.id = String(resource[0].id)
  })

  afterEach(async () => {
    const resource = await db('resource')
      .where({ slug: 'test-patch-resource' })
      .first()

    await db('favorites')
      .where({
        user_id: user!.id,
        resource_id: resource.id,
      })
      .del()

    await db('resource')
      .where({ user_id: user!.id, slug: 'test-patch-resource' })
      .del()
  })

  it('should create a favorite', async () => {
    const response = await supertest(server)
      .put(`${pathRoot.v1.favorites}/`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(req)

    const favorite = await db('favorites')
      .where({ resource_id: req.id })
      .first()

    expect(favorite).not.toBe(null)
    expect(favorite?.resource_id).toBe(req.id)
    expect(response.status).toBe(204)
  })

  it('should delete a favorite if already exists', async () => {
    const resource = await db('resource')
      .where({ slug: 'test-patch-resource' })
      .first()

    await db('favorites').insert({
      user_id: user!.id,
      resource_id: resource.id,
    })

    const response = await supertest(server)
      .put(`${pathRoot.v1.favorites}/`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(resource!)

    const favorite = await db('favorites')
      .where({ resource_id: resource.id })
      .first()

    expect(favorite).toBe(undefined)
    expect(response.status).toBe(204)
  })

  it('should accept string only', async () => {
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
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(newResource)
    expect(response.status).toBe(400)
  })
  checkInvalidToken(`${pathRoot.v1.favorites}/`, 'put', req)
})
