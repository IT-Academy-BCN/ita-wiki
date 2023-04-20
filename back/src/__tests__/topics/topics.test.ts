import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe('Testing topics endpoint', () => {
    describe('Testing GET method',  () => {
        test('Should respond OK status and return topics as an array. As per seed data, it should not be empty, and contain objects with an id and topic.', async () => {
            const response = await supertest(server).get('/api/v1/topics')

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0)
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

    describe('Testing GET /topics/:categoryId', () => {
        test('Should respond OK status and return topics as an array. As per seed data, it should not be empty, and contain objects with an id and topic.', async () => {
            const response = await supertest(server).get('/api/v1/topics/clgpl2wko0002f94gedbkos1g')

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body).toEqual([
                {
                    id: 'clgpl2wl50007f94glqhh1fut',
                    name: 'Components'
                },
                {
                    id: 'clgpl2wl50009f94gsu5d9sp6',
                    name: 'Listas'
                }
            ]);
        })
    })
})