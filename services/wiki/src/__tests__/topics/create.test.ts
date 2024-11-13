import cuid from 'cuid'
import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import { TCategory } from '../../helpers/wiki/transformResourceToAPI'
import db from '../../db/knex'

let testCategory: TCategory | null | undefined

beforeAll(async () => {
  const categoryId = cuid()
  const res: TCategory[] = await db<TCategory>('category')
    .returning('*')
    .insert({
      id: categoryId,
      name: 'Node',
      slug: 'node',
      updated_at: new Date(),
      created_at: new Date(),
    })
  // eslint-disable-next-line prefer-destructuring
  testCategory = res[0]
})

afterAll(async () => {
  await db('topic').where({ slug: 'node-file-system' }).del()
  await db('category').where({ slug: 'node' }).del()
})

describe('Testing resource creation endpoint', () => {
  it('Mentor OR higher should be able to create a new topic', async () => {
    const newTopic = {
      name: 'Node File System',
      categoryId: testCategory!.id,
    }

    const response = await supertest(server)
      .post(`${pathRoot.v1.topics}`)
      .set('Cookie', [`authToken=${authToken.mentor}`])
      .send(newTopic)

    expect(response.status).toBe(204)
  })
  it('Should NOT be able to create a new topic if not mentor or higher', async () => {
    const newTopic = {
      name: 'Node File System',
      categoryId: testCategory!.id,
    }

    const response = await supertest(server)
      .post(`${pathRoot.v1.topics}`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(newTopic)

    expect(response.status).toBe(403)
  })
  it('Should return 401 status if no token is provided', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.topics}`)
      .send({
        name: 'Node File System',
        categoryId: testCategory!.id,
      })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  it('Check invalid token', async () => {
    checkInvalidToken(`${pathRoot.v1.topics}`, 'post', {
      name: 'Node File System',
      categoryId: testCategory!.id,
    })
  })
})
