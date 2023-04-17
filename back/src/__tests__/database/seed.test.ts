import { expect, test, describe } from 'vitest'
import { prisma } from '../../prisma/client'

describe('Seeded data exists in the Database', () => {
    test('User with email test@example.com exists', async () => {
        const seedUser = await prisma.user.findUnique({
            where: {
                email: 'test@example.com'
            }
        })
        expect(seedUser).not.toBe(null)
    })

    test('Topic React exists', async () => {
        const seedTopic = await prisma.topic.findUnique({
            where: {
                topic: 'React'
            }
        })
        expect(seedTopic).not.toBe(null)
    })

    test('Topic Javascript exists', async () => {
        const seedTopic = await prisma.topic.findUnique({
            where: {
                topic: 'Javascript'
            }
        })
        expect(seedTopic).not.toBe(null)
    })

    test('There exist three resources in the database', async () => {
        const seedResources = await prisma.resource.count()
        expect(seedResources).toBe(3)
    })
})
