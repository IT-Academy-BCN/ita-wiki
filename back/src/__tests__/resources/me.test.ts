import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe("Testing resources/me endpoint", () => {
    test("Should return error if no token is provided", async () => {
        const response = await supertest(server).get('/api/v1/resources/me')
        expect(response.status).toBe(401);        
        expect(response.body.error).toBe('Unauthorized: Missing token')
    })

    test("Should return resources from user", async () => {
        const loginDni = '23456789B'
        const loginPswd = 'password2'
        const login = await supertest(server).post('/api/v1/auth/login').send({
            dni: loginDni,
            password: loginPswd,
        })
        const authToken = login.header['set-cookie'][0].split(';')[0]
        
        const response = await supertest(server)
            .get('/api/v1/resources/me')
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