import supertest from 'supertest'
import { expect, test, describe, it } from 'vitest'
import { server, authToken } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'

describe("Testing VOTE endpoint, PUT method", async () => {
    const resource = await prisma.resource.findFirst()

    test("Should return error if no token is provided", async () => {
        const response = await supertest(server).put(`${pathRoot.v1.resources}/vote/${resource!.id}/1`)
        expect(response.status).toBe(401);        
        expect(response.body.error).toBe('Unauthorized: Missing token')
    })

    test("With valid token", async () => {
        it("Should succeed with valid params", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/${resource!.id}/1`)
                .set('Cookie', authToken)
            expect(response.status).toBe(204);
        })

        it("Should fail with invalid resourceId", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/someInvalidResourceId/1`)
                .set('Cookie', authToken)
            expect(response.status).toBe(400);
        })

        it("Should fail with valid resourceId but does not belong to one", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/cjld2cjxh0000qzrmn831i7rn/1`)
                .set('Cookie', authToken)
            expect(response.status).toBe(404);
            expect(response.body).toBe({message: 'Resource not found'})
        })

        it("Should fail with invalid vote", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/someInvalidResourceId/5`)
                .set('Cookie', authToken)
            expect(response.status).toBe(400);
        })

        it("Should fail with missing vote", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/someInvalidResourceId/`)
                .set('Cookie', authToken)
            expect(response.status).toBe(400);
        })

    })
})