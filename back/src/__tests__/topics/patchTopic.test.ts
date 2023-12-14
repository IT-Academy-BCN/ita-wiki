import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { Category, Topic } from '@prisma/client'
import slugify from 'slugify'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoServer'

let testCategory1: Category | null
let testCategory2: Category | null
let testTopicToPatch: Topic | null

beforeAll(async () => {
  await prisma.category.createMany({
    data: [
      {
        name: 'Node',
        slug: 'node',
      },
      {
        name: 'Deno',
        slug: 'deno',
      },
    ],
  })

  testCategory1 = await prisma.category.findUnique({
    where: { slug: 'node' },
  })
  testCategory2 = await prisma.category.findUnique({
    where: { slug: 'deno' },
  })

  await prisma.topic.create({
    // Suppose a topic is mistakenly created with wrong name and categoryId
    data: {
      name: 'Nottttte File System',
      slug: 'nottttte-file-system',
      categoryId: testCategory2!.id,
    },
  })

  testTopicToPatch = await prisma.topic.findFirst({
    where: { slug: 'nottttte-file-system' },
  })
})

afterAll(async () => {
  await prisma.topic.deleteMany({
    where: { id: testTopicToPatch!.id },
  })
  await prisma.category.deleteMany({
    where: { OR: [{ slug: 'node' }, { slug: 'deno' }] },
  })
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

    const updatedTopic = await prisma.topic.findFirst({
      where: { id: testTopicToPatch!.id },
    })

    expect(updatedTopic!.name).toEqual(modifiedTopic.name)
    expect(updatedTopic!.slug).toEqual(
      slugify(modifiedTopic.name, { lower: true })
    )
    expect(updatedTopic!.categoryId).toEqual(modifiedTopic.categoryId)
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
