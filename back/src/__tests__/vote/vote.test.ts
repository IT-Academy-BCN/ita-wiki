import { Category, Resource, User } from '@prisma/client'
import supertest from 'supertest'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { voteCountSchema } from '../../schemas'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoServer'

let resource: Resource
let testUser: User

beforeAll(async () => {
  testUser = (await prisma.user.findFirst({
    where: { name: testUserData.admin.name },
  })) as User

  const category = (await prisma.category.findUnique({
    where: { slug: 'testing' },
  })) as Category

  resource = await prisma.resource.create({
    data: {
      title: 'Test Resource',
      slug: 'test-resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resourceType: 'BLOG',
      userId: testUser.id,
      categoryId: category.id,
    },
  })
  const user = (await prisma.user.findFirst({
    where: { name: testUserData.user.name },
  })) as User
  await prisma.vote.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      resource: {
        connect: { id: resource.id },
      },
      vote: -1,
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
  it('Should succeed with valid params but no logged in user', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.vote}/${resource.id}`
    )
    expect(response.status).toBe(200)
    expect(() => voteCountSchema.parse(response.body)).not.toThrow()
    expect(response.body.userVote).toBe(0)
  })
  it('Should return userVote as 0 for logged in user who hasn’t voted', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.vote}/${resource.id}`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    expect(response.status).toBe(200)
    expect(() => voteCountSchema.parse(response.body)).not.toThrow()
    expect(response.body.userVote).toBe(0)
  })
  it('Should return userVote as a number for logged in user who has voted', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.vote}/${resource.id}`)
      .set('Cookie', [`authToken=${authToken.user}`])

    expect(response.status).toBe(200)
    expect(() => voteCountSchema.parse(response.body)).not.toThrow()
    expect(response.body.userVote).toBe(-1)
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
  it('Should return error if no token is provided', async () => {
    const response = await supertest(server).put(`${pathRoot.v1.vote}`).send({
      resourceId: resource.id,
      vote: 'up',
    })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  it('Check invalid token', async () => {
    checkInvalidToken(`${pathRoot.v1.vote}`, 'put', {
      resourceId: resource.id,
      vote: 'up',
    })
  })

  describe('With valid token', () => {
    describe('Testing success: up, down and cancel options', () => {
      it('Should succeed with up vote, and update the data in the db', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', [`authToken=${authToken.admin}`])
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
          .set('Cookie', [`authToken=${authToken.admin}`])
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
          .set('Cookie', [`authToken=${authToken.admin}`])
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
          .set('Cookie', [`authToken=${authToken.admin}`])
          .send({
            resourceId: 'someInvalidResourceId',
            vote: 'down',
          })
        expect(response.status).toBe(400)
      })
      it('Should fail with valid resourceId but does not belong to one', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', [`authToken=${authToken.admin}`])
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
          .set('Cookie', [`authToken=${authToken.admin}`])
          .send({
            resourceId: resource.id,
            vote: 1,
          })
        expect(response.status).toBe(400)
      })
      it('Should fail with missing vote', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', [`authToken=${authToken.admin}`])
          .send({
            resourceId: resource.id,
          })
        expect(response.status).toBe(400)
      })
      it('Should fail with missing body', async () => {
        const response = await supertest(server)
          .put(`${pathRoot.v1.vote}`)
          .set('Cookie', [`authToken=${authToken.admin}`])
        expect(response.status).toBe(400)
      })
    })
  })
})
