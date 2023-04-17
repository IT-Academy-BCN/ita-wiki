import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe('Testing topics endpoint', () => {
    describe('Testing GET method', () => {
        test('Should respond OK status and return topics as an array. As per seed data, it should not be empty.', async () => {
            const response = await supertest(server)
                .get('/api/v1/topics')
            
            expect(response.status).toBe(200);
            expect(response.body.topics).toBeInstanceOf(Array)
            expect(response.body.topics.length).toBeGreaterThan(0)
        })
    })
})