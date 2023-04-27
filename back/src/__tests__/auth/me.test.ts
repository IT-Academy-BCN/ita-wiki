import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe("Testing ME endpoint", () => {
    test("Should return error if no token is provided", async () => {
        const response = await supertest(server).get('/api/v1/auth/me')
        expect(response.status).toBe(401);        
        expect(response.body.error).toBe('Unauthorized: Missing token')
    })

    test("Should return user info", async () => {
        const loginDni = '23456789B'
        const loginPswd = 'password2'
        const login = await supertest(server).post('/api/v1/auth/login').send({
            dni: loginDni,
            password: loginPswd,
        })
        const authToken = login.header['set-cookie'][0].split(';')[0]
        
        const response = await supertest(server)
            .get('/api/v1/auth/me')
            .set('Cookie', authToken)
        expect(response.status).toBe(200);        
        expect(response.body).toEqual(expect.objectContaining({
            name: expect.any(String),
            dni: loginDni,
            email: expect.any(String),
            status: expect.any(String),
            role: expect.any(String)
        }))
    })
})