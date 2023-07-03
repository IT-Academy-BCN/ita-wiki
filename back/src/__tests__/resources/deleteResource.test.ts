import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceTestData } from '../mocks/resources'
import { Resource, Topic } from '@prisma/client'

describe('Testing resource modify endpoint', () => {
    let testResource: Resource
    let testTopic: Topic

    beforeAll(async () => {
        testTopic = (await prisma.topic.findUnique({
            where: { slug: 'testing' },
        })) as Topic

        const testResourceData = {
            ...resourceTestData[0],
            user: { connect: { dni: testUserData.user.dni } },
        }
        testResource = await prisma.resource.create({
            data: testResourceData,
        })
        await prisma.topicsOnResources.create({
            data: {
                resourceId: testResource.id,
                topicId: testTopic.id
            }
        })
    })

    afterAll(async () => {
        await prisma.topicsOnResources.deleteMany({
            where: { topic: { id: testTopic.id } },
        })
        await prisma.resource.deleteMany({
            where: { user: { dni: testUserData.user.dni } },
        })
    })

    test('resource should be deleted', async () => {
        let resource = await prisma.resource.findUnique({
            where: { slug: 'test-resource-1-blog' },
            include: { topics: true }
        })
        const newResource = {
            id: resource!.id,
            userId: resource!.userId,
        }

        const response = await supertest(server)
            .delete(`${pathRoot.v1.resources}/`)
            .set('Cookie', authToken.admin)
            .send(newResource!)
        const answer = await prisma.resource.findUnique({
            where: { slug: 'test-resource-1-blog' },
            include: { topics: true }
        })

        expect(answer).toBe(null)
        expect(response.status).toBe(204)
    })

    test('if resource does not exists should return 404 not found', async () => {

        const newResource = {
            id: 'c!.id',
            userid: 'c!.userId'
        }
        const response = await supertest(server)
            .delete(`${pathRoot.v1.resources}/`)
            .set('Cookie', authToken.admin)
            .send(newResource!)
        expect(response.status).toBe(404)
    })
})