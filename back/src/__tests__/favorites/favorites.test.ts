import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'

describe('Testing /favorites/ endpoint', () => {
    describe('Testing GET /by-user/:userId', () => {
        test('Should respond OK status and return favorites as an array.', async () => {

            const user = await prisma.user.findUnique({
                where: {
                    email: "registered@registered.com"
                },
            });
            const userId = user?.id
            const response = await supertest(server).get(`/api/v1/favorites/by-user/${userId}`)

            expect(response.status).toBe(200);
            // expect(response.body).toBeInstanceOf(Array)
            // expect(response.body.length).toBeGreaterThan(0)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        name: expect.any(String)
                    })
                ])
            )
        })
    })
})