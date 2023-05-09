import { Resource } from '@prisma/client'
import supertest from 'supertest'
import { expect, test, describe, it, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'

let resource: Resource

beforeAll(async () => {
    const testUser = await prisma.user.findUnique({
      where: {dni: testUserData.admin.dni}
    })
    
    resource = await prisma.resource.create({
      data: {
        title: 'Test Resource',
        slug: 'test-resource',
        description: 'This is a new resource',
        url: 'https://example.com/resource',
        resourceType: 'BLOG',
        userId: testUser!.id
      }
    })
  })
  
  afterAll(async () => {
    await prisma.vote.deleteMany({
        where: { resourceId: resource.id }
    })
    await prisma.resource.delete({
      where: { id: resource.id },
    })
  })

describe("Testing VOTE endpoint, PUT method", async () => {

    test("Should return error if no token is provided", async () => {
        const response = await supertest(server).put(`${pathRoot.v1.resources}/vote/${resource.id}/1`)
        expect(response.status).toBe(401);        
        expect(response.body.error).toBe('Unauthorized: Missing token')
    })

    describe("With valid token", () => {
        it("Should succeed with valid params", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/${resource.id}/1`)
                .set('Cookie', authToken.admin)
            expect(response.status).toBe(204);
        })

        it("Should fail with invalid resourceId", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/someInvalidResourceId/1`)
                .set('Cookie', authToken.admin)
            expect(response.status).toBe(400);
        })

        it("Should fail with valid resourceId but does not belong to one", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/cjld2cjxh0000qzrmn831i7rn/1`)
                .set('Cookie', authToken.admin)
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Resource not found')
        })

        it("Should fail with invalid vote", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/someInvalidResourceId/5`)
                .set('Cookie', authToken.admin)
            expect(response.status).toBe(400);
        })

        it("Should fail with missing vote", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/someInvalidResourceId/`)
                .set('Cookie', authToken.admin)
            expect(response.status).toBe(404);
        })
    })
})