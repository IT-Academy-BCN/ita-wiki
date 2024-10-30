import { Category } from '@prisma/client'
import supertest from 'supertest'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import cuid from 'cuid'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import db from '../../db/knex'

let resource
let testUser

beforeAll(async () => {
  testUser = await db('user')
    .where({
      id: testUserData.admin.id,
    })
    .first()

  const category = (await db('category')
    .where({
      slug: testCategoryData.slug,
    })
    .first()) as Category

  const [resourceArray] = await db('resource')
    .insert({
      id: cuid(),
      title: 'Test Resource',
      slug: testCategoryData.slug,
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resource_type: 'BLOG',
      user_id: testUser.id,
      category_id: category.id,
      updated_at: new Date(),
      created_at: new Date(),
    })
    .returning('id')

  resource = resourceArray

  await db('vote').insert({
    user_id: testUser.id,
    resource_id: resource.id,
    vote: -1,
    updated_at: new Date(),
    created_at: new Date(),
  })
})

afterAll(async () => {
  await db('vote')
    .where({
      resource_id: resource.id,
    })
    .del()

  await db('resource')
    .where({
      id: resource.id,
    })
    .del()
})

// describe('Testing VOTE endpoint, GET method', async () => {
//   it('Should succeed with valid params but no logged in user', async () => {
//     const response = await supertest(server).get(
//       `${pathRoot.v1.vote}/${resource.id}`
//     )
//     expect(response.status).toBe(200)
//     expect(() => voteCountSchema.parse(response.body)).not.toThrow()
//     expect(response.body.userVote).toBe(0)
//   })
//   it('Should return userVote as 0 for logged in user who hasn’t voted', async () => {
//     const response = await supertest(server)
//       .get(`${pathRoot.v1.vote}/${resource.id}`)
//       .set('Cookie', [`authToken=${authToken.admin}`])

//     expect(response.status).toBe(200)
//     expect(() => voteCountSchema.parse(response.body)).not.toThrow()
//     expect(response.body.userVote).toBe(0)
//   })
//   it('Should return userVote as a number for logged in user who has voted', async () => {
//     const response = await supertest(server)
//       .get(`${pathRoot.v1.vote}/${resource.id}`)
//       .set('Cookie', [`authToken=${authToken.user}`])

//     expect(response.status).toBe(200)
//     expect(() => voteCountSchema.parse(response.body)).not.toThrow()
//     expect(response.body.userVote).toBe(-1)
//   })

//   it('Should fail with invalid resourceId', async () => {
//     const response = await supertest(server).get(
//       `${pathRoot.v1.vote}/someInvalidResourceId`
//     )
//     expect(response.status).toBe(400)
//   })
//   it('Should fail with valid resourceId but does not belong to one', async () => {
//     const response = await supertest(server).get(
//       `${pathRoot.v1.vote}/cjld2cjxh0000qzrmn831i7rn`
//     )
//     expect(response.status).toBe(404)
//     expect(response.body).toStrictEqual({ message: 'Resource not found' })
//   })
// })

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
        const voteResult = await db('vote')
          .where({
            user_id: testUser.id,
            resource_id: resource.id,
          })
          .first()

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

        const voteResult = await db('vote')
          .where({
            user_id: testUser.id,
            resource_id: resource.id,
          })
          .first()

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
        const voteResult = await db('vote')
          .where({
            user_id: testUser.id,
            resource_id: resource.id,
          })
          .first()
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
