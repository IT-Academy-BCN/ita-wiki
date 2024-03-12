import supertest from 'supertest'
import { Category, Resource, User } from '@prisma/client'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'

let testResource: Resource
let user: User | null
beforeAll(async () => {
  const testCategory = (await prisma.category.findUnique({
    where: { slug: 'testing' },
  })) as Category
  user = await prisma.user.findFirst({
    where: { id: testUserData.user.id },
  })
  const testResourceData = {
    ...resourceTestData[0],
    user: { connect: { id: user?.id } },
    category: { connect: { id: testCategory.id } },
  }
  testResource = await prisma.resource.create({
    data: testResourceData,
  })
})

afterAll(async () => {
  await prisma.resource.deleteMany({
    where: { user: { id: user?.id } },
  })
})

describe('Testing resource/id GET endpoint', () => {
  it('should return a resource with a valid id belonging to one', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.resources}/id/${testResource.id}`
    )
    expect(response.status).toBe(200)
    expect(() => resourceGetSchema.parse(response.body)).not.toThrow()
  })

  it('should return a resource without user name if not provided', async () => {
    const testCategory = (await prisma.category.findUnique({
      where: { slug: 'testing' },
    })) as Category

    user = await prisma.user.findFirst({
      where: { id: testUserData.userWithNoName.id },
    })

    const testResourceDataWithoutName = {
      ...resourceTestData[1],
      user: { connect: { id: user?.id } },
      category: { connect: { id: testCategory.id } },
    }

    const testResourceWithoutName = await prisma.resource.create({
      data: testResourceDataWithoutName,
    })

    const response = await supertest(server).get(
      `${pathRoot.v1.resources}/id/${testResourceWithoutName.id}`
    )
    expect(response.status).toBe(200)
    expect(() => resourceGetSchema.parse(response.body)).not.toThrow()
  })

  it('should return a 404 for a valid id belonging to no resource', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.resources}/id/cli1g2ovc555etua0idayvvxw`
    )
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Resource not found')
  })
  it('should return 400 if no valid id is given', async () => {
    const response = await supertest(server).get(
      `${pathRoot.v1.resources}/id/something-else-invalid`
    )
    expect(response.status).toBe(400)
  })
})
