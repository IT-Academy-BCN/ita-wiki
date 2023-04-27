import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'
import { prisma } from '../../prisma/client'

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
        test('Should respond OK status and return topics as an array.', async () => {
            
            const category = await prisma.category.findUnique({
                where: {
                  name: 'React',
                },
              });
            const  categoryId = category?.id
            const response = await supertest(server).get(`/api/v1/topics/category/${categoryId}`)

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
})

describe('GET /topics/resource/:resourceId', () => {
    test('should return an array of topics related to the specified resource with a valid resourceId', async () => {
        
        const testResource1 = await prisma.resource.findUnique({
            
            where: {
                id: 'clgyxvl9q000b3fnkcdgjt2da'
            },
        }); 

        const response = await supertest(server).get(`/api/v1/topics/resource/${testResource1?.id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

    });
});