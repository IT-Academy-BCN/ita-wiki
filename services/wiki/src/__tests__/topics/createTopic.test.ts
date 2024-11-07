import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { server } from '../globalSetup'
import db from '../../db/knex'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import { mockCategory } from '../mocks/category'

let testCategory: any

beforeAll(async () => {
  console.log('Iniciant beforeAll')

  await db('category').insert({
    id: mockCategory.id,
    name: mockCategory.name,
    slug: mockCategory.slug,
    created_at: mockCategory.created_at,
    updated_at: mockCategory.updated_at,
  })
  console.log('Categoria inserida')

  testCategory = await db('category').where({ slug: mockCategory.slug }).first()
  console.log('testCategory', testCategory)
})

afterAll(async () => {
  console.log('Iniciant afterAll')

  await db('topic').where({ slug: 'node-file-system' }).del()
  await db('category').where({ slug: mockCategory.slug }).del()
  console.log('Neteja completada')
})
describe('Testing resource creation endpoint', () => {
  it('Mentor OR higher should be able to create a new topic', async () => {
    const newTopic = {
      name: 'Node File System',
      category_id: testCategory.id,
      slug: 'node-file-system',
    }
    console.log('Enviant nou tòpic:', newTopic)
    const response = await supertest(server)
      .post(`${pathRoot.v1.topics}`)
      .set('Cookie', [`authToken=${authToken.mentor}`])
      .send(newTopic)
    console.log('Resposta rebuda:', response.status, response.body)

    expect(response.status).toBe(204) // pq dona 400????
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
      category_id: testCategory.id,
      slug: 'node-file-system',
    })
  })
})
