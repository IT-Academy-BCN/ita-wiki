import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server, authToken } from '../setup'
import { pathRoot } from '../../routes/routes'

describe("Testing resources/me endpoint", () => {
    test("Should return error if no token is provided", async () => {
        const response = await supertest(server).get(`${pathRoot.v1.resources}/me`)
        expect(response.status).toBe(401);        
        expect(response.body.error).toBe('Unauthorized: Missing token')
    })

    test("Should return resources from user", async () => {
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
    })
})