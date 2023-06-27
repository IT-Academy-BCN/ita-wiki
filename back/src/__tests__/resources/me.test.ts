import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'

beforeAll(async () => {
  const user = await prisma.user.findUnique({
    where: { email: 'testingUser@user.cat' },
  })

  const testResourceWithUser = {
    ...resourceTestData[0],
    userId: user!.id,
  }
  await prisma.resource.create({
    // @ts-ignore
    data: testResourceWithUser,
  })
})

afterAll(async () => {
  await prisma.resource.deleteMany({
    where: { user: { dni: testUserData.user.dni } },
  })
})

describe('Testing resources/me endpoint', () => {
  test('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.resources}/me`)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Unauthorized: Missing token')
  })

  test('User with no resources posted returns empty array.', async () => {
    // User admin has no posted resources
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', authToken.admin)

    expect(response.status).toBe(200)
    expect(response.body.resources).toBeInstanceOf(Array)
    expect(response.body.resources.length).toBe(0)
  })

  test('Should return resources from user', async () => {
    // Normal user has a resource created for this test.
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', authToken.user)

    expect(response.status).toBe(200)
    expect(response.body.resources).toBeInstanceOf(Array)
    expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  test('Given a valid category slug, should return resources related to that category', async () => {
    const categorySlug = 'react'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', authToken.user)
      .query({ categorySlug })
    expect(response.status).toBe(200)
    console.log(response.body)
    expect(response.body.resources).toBeInstanceOf(Array)
    expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })
})
