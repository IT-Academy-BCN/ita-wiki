import supertest from 'supertest'
import { expect, test, describe, it } from 'vitest'
import { server } from '../setup'
import { prisma } from '../../prisma/client'

describe("Testing VOTE endpoint, PUT method", async () => {
    const resource = await prisma.resource.findFirst()
    const loginInfo = {
        dni: '23456789B',
        password: 'password2'
    }

    test("Should return error if no token is provided", async () => {
        const response = await supertest(server).put(`/api/v1/resources/vote/${resource?.id}/1`)
        expect(response.status).toBe(401);        
        expect(response.body.error).toBe('Unauthorized: Missing token')
    })

    test("With valid token", async () => {
        const login = await supertest(server).post('/api/v1/auth/login').send({
            dni: loginInfo.dni,
            password: loginInfo.password,
        })
        const authToken = login.header['set-cookie'][0].split(';')[0]

        it("Should succeed with valid params", async () => {
            const response = await supertest(server)
                .put(`/api/v1/resources/vote/${resource?.id}/1`)
                .set('Cookie', authToken)
            expect(response.status).toBe(204);
        })

        it("Should fail with invalid resourceId", async () => {
            const response = await supertest(server)
                .put(`/api/v1/resources/vote/someInvalidResourceId/1`)
                .set('Cookie', authToken)
            expect(response.status).toBe(400);
        })

        it("Should fail with invalid vote", async () => {
            const response = await supertest(server)
                .put(`/api/v1/resources/vote/someInvalidResourceId/5`)
                .set('Cookie', authToken)
            expect(response.status).toBe(400);
        })

        it("Should fail with missing vote", async () => {
            const response = await supertest(server)
                .put(`/api/v1/resources/vote/someInvalidResourceId/`)
                .set('Cookie', authToken)
            expect(response.status).toBe(400);
        })

    })
})