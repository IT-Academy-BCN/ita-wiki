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

    test('resource owner should be the same as userId sending the modify petition', async () => {
        let resource = await prisma.resource.findUnique({
            where: { slug: 'test-resource-1-blog' }
        })
        const newResource = {
            id: resource!.id,
            title: null,
            description: null,
            url: null,
            topics: null,
            resourceType: null,
            userId: 'resource!.userId',
        }

        const response = await supertest(server)
            .put(`${pathRoot.v1.resources}/`)
            .set('Cookie', authToken.admin)
            .send(newResource!)
        expect(response.status).toBe(401)
    })

    test('should accept string or null only', async () => {
        const newResource = {
            id: 'cljfiayg80000ungsabdmxsaf',
            title: 23,
            slug: 'test-resource-1-blog',
            description: 'Lorem ipsum blog',
            url: 'https://sample.com',
            resourceType: 'BLOG',
            userId: 'clje19smu0001unpshapn2ofh',
            createdAt: '2023-06-28T09:20:47.336Z',
            updatedAt: '2023-06-28T09:20:47.336Z'
        }

        const response = await supertest(server)
            .put(`${pathRoot.v1.resources}/`)
            .set('Cookie', authToken.admin)
            .send(newResource)
        expect(response.status).toBe(400)
    })

    test('should modify topics', async () => {
        let newResource = await prisma.resource.findUnique({
            where: { slug: 'test-resource-1-blog' },
            include: { topics: true }
        })
        let newTopic = await prisma.topic.findUnique({
            where: { slug: 'listas' }
        })

        let lastRes = {
            id: newResource!.id,
            title: null,
            description: null,
            url: null,
            topic: newTopic!.resourceId,
            resourceType: null,
            userId: newResource?.userId,
        }

        const response = await supertest(server)
            .put(`${pathRoot.v1.resources}/`)
            .set('Cookie', authToken.admin)
            .send(lastRes!)

        const compare = await prisma.resource.findUnique({
            where: { slug: 'test-resource-1-blog' },
            include: { topics: true }
        })
        const topicOnResource = await prisma.topicsOnResources.findFirst({
            where: { resourceId: newResource!.id }
        })

        expect(compare!.topics[0].topicId).toBe(topicOnResource!.topicId)
        expect(response.status).toBe(204)
    })

    test('should modify a resource with new Title', async () => {
        const newTitle = "test nuevo"
        const resource = await prisma.resource.findUnique({
            where: { slug: 'test-resource-1-blog' },
            include: { topics: true }
        })

        let newResource = resource
        newResource!.title = newTitle

        const response = await supertest(server)
            .put(`${pathRoot.v1.resources}/`)
            .set('Cookie', authToken.admin)
            .send(newResource!)
        const lastResource = await prisma.resource.findUnique({
            where: { id: newResource!.id }
        })
        expect(lastResource?.title).toBe(newTitle)
        expect(response.status).toBe(204)
    })
})