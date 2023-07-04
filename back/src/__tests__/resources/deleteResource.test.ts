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

    test('resource and its topics should be deleted', async () => {
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
        const topicsAnswer = await prisma.topicsOnResources.findFirst({
            where: { resourceId: newResource.id }
        })

        expect(answer).toBe(null)
        expect(topicsAnswer).toBe(null)
        expect(response.status).toBe(204)
    })

    test('should accept string only', async () => {
        const newResource = {
            id: 'cljfiayg80000ungsabdmxsaf',
            userId: 23,
        }

        const response = await supertest(server)
            .put(`${pathRoot.v1.resources}/`)
            .set('Cookie', authToken.admin)
            .send(newResource)
        expect(response.status).toBe(400)
    })
})