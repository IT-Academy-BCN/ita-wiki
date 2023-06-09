import { Resource, User } from '@prisma/client'
import supertest from 'supertest'
import { expect, test, describe, it, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { voteCountSchema } from '../../schemas'

let resource: Resource
let testUser: User

beforeAll(async () => {
  testUser = (await prisma.user.findUnique({
    where: { dni: testUserData.admin.dni },
  })) as User

  resource = await prisma.resource.create({
    data: {
      title: 'Test Resource',
      slug: 'test-resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resourceType: 'BLOG',
      userId: testUser.id,
    },
  })
})

afterAll(async () => {
  await prisma.vote.deleteMany({
    where: { resourceId: resource.id },
  })
  await prisma.resource.delete({
    where: { id: resource.id },
  })
})

describe('Testing VOTE endpoint, GET method', async () => {
  it('Should succeed with valid params', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.vote}/${resource.id}`
    )
    expect(response.status).toBe(200)
    expect(() => voteCountSchema.parse(response.body.voteCount)).not.toThrow()
  })
  it('Should fail with invalid resourceId', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.vote}/someInvalidResourceId`
    )
    expect(response.status).toBe(400)
  })
  it('Should fail with valid resourceId but does not belong to one', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.vote}/cjld2cjxh0000qzrmn831i7rn`
    )
    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({ message: 'Resource not found' })
  })
})
describe('Testing VOTE endpoint, PUT method', async () => {
  test('Should return error if no token is provided', async () => {
    const response = await supertest(server).put(`${pathRoot.v1.vote}`).send({
      resourceId: resource.id,
      vote: 'up',
    })
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Unauthorized: Missing token')
  })
  describe('With valid token', () => {
    describe('Testing success: up, down and cancel options', () => {
      it('Should succeed with up vote, and update the data in the db', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', authToken.admin)
          .send({
            resourceId: resource.id,
            vote: 'up',
          })
        expect(response.status).toBe(204)

        const voteResult = await prisma.vote.findUnique({
          where: {
            userId_resourceId: { userId: testUser.id, resourceId: resource.id },
          },
        })
        expect(voteResult!.vote).toBe(1)
      })
      it('Should succeed with down vote, and update the data in the db', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', authToken.admin)
          .send({
            resourceId: resource.id,
            vote: 'down',
          })
        expect(response.status).toBe(204)
        const voteResult = await prisma.vote.findUnique({
          where: {
            userId_resourceId: { userId: testUser.id, resourceId: resource.id },
          },
        })
        expect(voteResult!.vote).toBe(-1)
      })
      it('Should succeed with canceling the vote, and update the data in the db', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', authToken.admin)
          .send({
            resourceId: resource.id,
            vote: 'cancel',
          })
        expect(response.status).toBe(204)
        const voteResult = await prisma.vote.findUnique({
          where: {
            userId_resourceId: { userId: testUser.id, resourceId: resource.id },
          },
        })
        expect(voteResult!.vote).toBe(0)
      })
    })
    describe('Testing failure', () => {
      it('Should fail with invalid resourceId', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', authToken.admin)
          .send({
            resourceId: 'someInvalidResourceId',
            vote: 'down',
          })
        expect(response.status).toBe(400)
      })
      it('Should fail with valid resourceId but does not belong to one', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', authToken.admin)
          .send({
            resourceId: 'cjld2cjxh0000qzrmn831i7rn',
            vote: 'cancel',
          })
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Resource not found')
      })
      it('Should fail with invalid vote', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', authToken.admin)
          .send({
            resourceId: resource.id,
            vote: 1,
          })
        expect(response.status).toBe(400)
      })
      it('Should fail with missing vote', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', authToken.admin)
          .send({
            resourceId: resource.id,
          })
        expect(response.status).toBe(400)
      })
      it('Should fail with missing body', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', authToken.admin)
        expect(response.status).toBe(400)
      })
    })
  })
})
