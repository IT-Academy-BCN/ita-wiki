import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'
import { prisma } from '../../prisma/client'

describe('GET /api/v1/resources/topic/:topicId', () => {

    const url = `/api/v1/resources/topic`;

    test('Should respond OK status when topic ID exists in database and return resources associated with that topic ID as an array.', async () => {

        const topic = await prisma.topic.findUnique({
            where: {
              slug: 'eventos',
            },
        });
        
        const  topicId = topic?.id
        const response = await supertest(server).get(`${url}/${topicId}`);
            
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

       test('should fail if topic ID does not exist in database', async () => {

            const response = await supertest(server).get(`${url}/this-topic-does-not-exist`);
            
            expect(response.status).toBe(404);
            expect(response.body.message).toEqual('Topic not found'); 
    }); 

});



