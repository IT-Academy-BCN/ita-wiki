import supertest from 'supertest'
import { expect, describe, it, beforeAll } from 'vitest'
import { server } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'

let authToken: string
let resource: any
beforeAll(async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '23456789B',
      password: 'password2',
    })
    // eslint-disable-next-line prefer-destructuring
    authToken = response.header['set-cookie'][0].split(';')[0]

    resource = await prisma.resource.findFirst()
})


describe("Testing VOTE endpoint, GET method", async () => {
    it("Should succeed with valid params", async () => {
        const response = await supertest(server).get(`${pathRoot.v1.resources}/vote/${resource.id}`)
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            voteCount: expect.objectContaining({
                upvote: expect.any(Number),
                downvote: expect.any(Number),
                total: expect.any(Number),
            })
        }))
    })

    it("Should fail with invalid resourceId", async () => {
        const response = await supertest(server).get(`${pathRoot.v1.resources}/vote/someInvalidResourceId`)
        expect(response.status).toBe(400);
    })

    it("Should fail with valid resourceId but does not belong to one", async () => {
        const response = await supertest(server).get(`${pathRoot.v1.resources}/vote/cjld2cjxh0000qzrmn831i7rn`)
        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual({message: 'Resource not found'})
    })
})

describe("Testing VOTE endpoint, PUT method", async () => {
    it("Should return error if no token is provided", async () => {
        const response = await supertest(server).put(`${pathRoot.v1.resources}/vote/${resource.id}/1`)
        expect(response.status).toBe(401);        
        expect(response.body.error).toBe('Unauthorized: Missing token')
    })

    describe("With valid token", async () => {

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
                .put(`${pathRoot.v1.resources}/cjld2cjxh0000qzrmn831i7rn/1`)
                .set('Cookie', authToken)
            expect(response.status).toBe(404);
            expect(response.body).toBe({message: 'Resource not found'})
        })

        it("Should fail with invalid vote", async () => {
            const response = await supertest(server)
                .put(`${pathRoot.v1.resources}/vote/${resource!.id}/5`)
                .set('Cookie', authToken)
            expect(response.status).toBe(400);
        })

    })
})