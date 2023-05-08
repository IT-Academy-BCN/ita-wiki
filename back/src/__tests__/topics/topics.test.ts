import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'

describe('Testing topics endpoint', () => {
    describe('Testing GET method',  () => {
        test('Should respond OK status and return topics as an array. As per seed data, it should not be empty, and contain objects with an id and topic.', async () => {
            const response = await supertest(server).get(`${pathRoot.v1.topics}`)

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        name: expect.any(String),
                        slug: expect.any(String),
                        categoryId: expect.any(String)
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
            const response = await supertest(server).get(`${pathRoot.v1.topics}/category/${categoryId}`)

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        name: expect.any(String),
                        slug: expect.any(String)
                    })
                ])
            )
        })
    })
})