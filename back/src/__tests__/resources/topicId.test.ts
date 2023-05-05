import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe('GET /api/v1/resources/topic/:topicId', () => {

    test('Should respond OK status and return resources as an array.', async () => {
        
            const response = await supertest(server).get('/api/v1/resources/topic/clha9en5g00083fbudw53w030')
            
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        title: expect.any(String)
                    })
                ]))
        });

       test('should fail if topic ID does not exist', async () => {

            const response = await supertest(server).get('/api/v1/resources/topic/blaaaaaaaaaaaah');
            
            expect(response.status).toBe(404);
            expect(response.body.message).toEqual('Topic not found'); 
    }); 

});

