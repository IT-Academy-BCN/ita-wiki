import { expect, test, describe } from 'vitest'
import { prisma } from '../../prisma/client'

describe('Seeded data exists in the Database', () => {
  test('User with email admin@admin.com exists', async () => {
    const seedUser = await prisma.user.findUnique({
      where: {
        email: 'admin@admin.com',
      },
    })
    expect(seedUser).not.toBe(null)
  })

  test('User with email registered@registered.com exists', async () => {
    const seedUser = await prisma.user.findUnique({
      where: {
        email: 'registered@registered.com',
      },
    })
    expect(seedUser).not.toBe(null)
  })

  test('Category React exists', async () => {
    const seedTopic = await prisma.category.findUnique({
      where: {
        name: 'React',
      },
    })
    expect(seedTopic).not.toBe(null)
  })

  test('Category Javascript exists', async () => {
    const seedTopic = await prisma.category.findUnique({
      where: {
        name: 'Javascript',
      },
    })
    expect(seedTopic).not.toBe(null)
  })

  test('Resources exist in the database', async () => {
    const titles = [
      'My resource in React',
      'My second resource in React',
      'My resource in Node',
      'My resource in Javascript',
    ]

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const i in titles) {
      expect(
        await prisma.resource.findFirst({
          where: {
            title: titles[i],
          },
        })
      ).not.toEqual(null)
    }
  })
})
