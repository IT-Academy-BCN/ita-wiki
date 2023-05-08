import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe('GET /api/v1/resources/topic/slug/:slug', () => {
    
    const url = `/api/v1/resources/topic/slug`; 

    test('Should respond OK status when topic slug exists in database and return resources associated with that topic slug as an array.', async () => {
        
        const response = await supertest(server).get(`${url}/eventos`);
        
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(1);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String)
                })
            ]))
        });

    test('should fail and return 404 error if topic slug does not exist in database', async () => {

        const response = await supertest(server).get(`${url}/this-topic-does-not-exist`);

        expect(response.status).toBe(404);
        expect(response.body.message).toEqual("Topic not found");

    });

});
