import { IncomingMessage, Server, ServerResponse } from 'http'
import { USER_STATUS, USER_ROLE } from '@prisma/client'
import { prisma } from '../prisma/client'
import { app } from '../server'

// eslint-disable-next-line import/no-mutable-exports
export let server: Server<typeof IncomingMessage, typeof ServerResponse>
// eslint-disable-next-line prefer-const
server = app.listen()

export const testUserData = {
  user: {
    email: 'testingUser@user.cat',
    name: 'testingUser',
    dni: '11111111A',
    password: 'testingPswd1',
    role: USER_ROLE.REGISTERED,
    status: USER_STATUS.ACTIVE,
    specializationId: '',
  },
  admin: {
    email: 'testingAdmin@user.cat',
    name: 'testingAdmin',
    dni: '22222222B',
    password: 'testingPswd2',
    role: USER_ROLE.ADMIN,
    status: USER_STATUS.ACTIVE,
    specializationId: '',
  },
  mentor: {
    email: 'testingMentor@user.cat',
    name: 'testingMentor',
    dni: '44444444B',
    password: 'testingPswd4',
    role: USER_ROLE.MENTOR,
    status: USER_STATUS.ACTIVE,
    specializationId: '',
  },
  inactiveUser: {
    email: 'testingInactiveUser@user.cat',
    name: 'testingInactiveUser',
    dni: '33333333A',
    password: 'testingPswd3',
    role: USER_ROLE.REGISTERED,
    status: USER_STATUS.INACTIVE,
    specializationId: '',
  },
}

export async function setup() {
  // Cleanup database
  await prisma.topicsOnResources.deleteMany()
  await prisma.favorites.deleteMany()
  await prisma.vote.deleteMany()
  await prisma.viewedResource.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.resource.deleteMany()
  await prisma.user.deleteMany()
  await prisma.category.deleteMany()

  // Create required test data
  const testCategory = await prisma.category.create({
    data: {
      name: 'Testing',
      slug: 'testing',
    },
  })

  const existingTestCategory = await prisma.category.findUnique({
    where: { name: 'Testing' },
  })
  await prisma.user.createMany({
    data: [
      { ...testUserData.admin, specializationId: existingTestCategory!.id },
      { ...testUserData.user, specializationId: existingTestCategory!.id },
      { ...testUserData.mentor, specializationId: existingTestCategory!.id },
      {
        ...testUserData.inactiveUser,
        specializationId: existingTestCategory!.id,
      },
    ],
  })

  await prisma.topic.create({
    data: {
      name: 'Testing',
      slug: 'testing',
      categoryId: testCategory.id,
    },
  })
}

export async function teardown() {
  // Cleanup database
  await prisma.topicsOnResources.deleteMany({})
  await prisma.topic.deleteMany({})
  await prisma.viewedResource.deleteMany()
  await prisma.resource.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.category.deleteMany({})
  server.close()
}
