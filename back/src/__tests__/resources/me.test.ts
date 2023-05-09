import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server, authToken, testUser } from '../setup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'

describe("Testing resources/me endpoint", () => {
  test("Should return error if no token is provided", async () => {
    const response = await supertest(server).get(`${pathRoot.v1.resources}/me`)
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized: Missing token')
  })

  test("User with no resources posted returns empty array", async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', authToken)
      
    expect(response.status).toBe(200);
    expect(response.body).toEqual([])
  })

  test("Should return resources from user", async () => {
    await prisma.resource.create({
      data: {
        title: 'Test Resource',
        slug: 'test-resource',
        description: 'This is a new resource',
        url: 'https://example.com/resource',
        resourceType: 'BLOG',
        userId: testUser.id
      }
    })

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', authToken)

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        url: expect.any(String),
        description: expect.any(String),
        resourceType: expect.any(String),
        userId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    ]))

    await prisma.resource.delete({
      where: { slug: 'test-resource' },
    })
  })
})