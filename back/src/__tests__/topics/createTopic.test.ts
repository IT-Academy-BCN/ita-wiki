import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { Category } from '@prisma/client'
import { server } from '../globalSetup'
import { authToken } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'

let testCategory: Category | null

beforeAll(async () => {
  await prisma.category.create({
    data: {
      name: 'Node',
      slug: 'node',
    },
  })

  testCategory = await prisma.category.findUnique({
    where: { slug: 'node' },
  })
})

afterAll(async () => {
  await prisma.topic.deleteMany({
    where: { slug: 'node-file-system' },
  })
  await prisma.category.deleteMany({
    where: { slug: 'node' },
  })
})

describe('Testing resource creation endpoint', () => {
  it('Mentor OR higher should be able to create a new topic', async () => {
    const newTopic = {
      name: 'Node File System',
      categoryId: testCategory!.id,
    }

    const response = await supertest(server)
      .post(`${pathRoot.v1.topics}`)
      .set('Cookie', authToken.mentor)
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
      .set('Cookie', authToken.user)
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
