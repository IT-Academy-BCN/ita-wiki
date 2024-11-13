import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import cuid from 'cuid'
import slugify from 'slugify'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import db from '../../db/knex'
import { TTopic, TCategory } from '../../helpers/wiki/transformResourceToAPI'

let testCategory1: TCategory | null | undefined
let testTopicToPatch: TTopic | null | undefined

beforeAll(async () => {
  const nodeCUID = cuid()
  const denoCUID = cuid()
  const topicCUID = cuid()

  await db('category').insert([
    {
      id: nodeCUID,
      name: 'Node',
      slug: 'node',
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      id: denoCUID,
      name: 'Deno',
      slug: 'deno',
      updated_at: new Date(),
      created_at: new Date(),
    },
  ])

  testCategory1 = await db<TCategory>('category')
    .where({ id: nodeCUID })
    .first()

  await db('topic').insert({
    id: topicCUID,
    name: 'Nottttte File System',
    slug: 'nottttte-file-system',
    category_id: denoCUID,
    updated_at: new Date(),
    created_at: new Date(),
  })

  testTopicToPatch = await db<TTopic>('topic').where({ id: topicCUID }).first()
})

afterAll(async () => {
  await db('topic').where({ id: testTopicToPatch?.id }).del()
  await db('category').whereIn('slug', ['node', 'deno']).del()
})

describe('Testing topic patch endpoint', () => {
  it('Mentor OR higher should be able to modify a topic', async () => {
    const modifiedTopic = {
      id: testTopicToPatch!.id,
      name: 'Node File System',
      categoryId: testCategory1!.id,
    }

    const response = await supertest(server)
      .patch(`${pathRoot.v1.topics}`)
      .set('Cookie', [`authToken=${authToken.mentor}`])
      .send(modifiedTopic)
    const updatedTopic = await db<TTopic>('topic')
      .where({ id: testTopicToPatch?.id })
      .first()

    expect(updatedTopic!.name).toEqual(modifiedTopic.name)
    expect(updatedTopic!.slug).toEqual(
      slugify(modifiedTopic.name, { lower: true })
    )
    expect(updatedTopic!.category_id).toEqual(modifiedTopic.categoryId)
    expect(response.status).toBe(204)
  })

  it('A user lower than mentor should not be able to modify a topic', async () => {
    const modifiedTopic = {
      id: testTopicToPatch!.id,
      name: 'Node File System',
      categoryId: testCategory1!.id,
    }

    const response = await supertest(server)
      .patch(`${pathRoot.v1.topics}`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(modifiedTopic)

    expect(response.status).toBe(403)
  })

  it('Should return 401 status if no token is provided', async () => {
    const response = await supertest(server)
      .patch(`${pathRoot.v1.topics}`)
      .send({
        id: testTopicToPatch!.id,
        name: 'Node File System',
        categoryId: testCategory1!.id,
      })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })

  it('Check invalid token ', async () => {
    checkInvalidToken(`${pathRoot.v1.topics}`, 'patch', {
      id: testTopicToPatch!.id,
      name: 'Node File System',
      categoryId: testCategory1!.id,
    })
  })
})
