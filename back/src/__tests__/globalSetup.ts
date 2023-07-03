import { IncomingMessage, Server, ServerResponse } from 'http'
import { USER_STATUS } from '@prisma/client'
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
    status: USER_STATUS.ACTIVE,
  },
  admin: {
    email: 'testingAdmin@user.cat',
    name: 'testingAdmin',
    dni: '22222222B',
    password: 'testingPswd2',
    role: 'ADMIN',
    status: USER_STATUS.ACTIVE,
  },
  inactiveUser: {
    email: 'testingInactiveUser@user.cat',
    name: 'testingInactiveUser',
    dni: '33333333A',
    password: 'testingPswd3',
    status: USER_STATUS.INACTIVE,
  },
}

export const setup = async () => {
  // First delete in case a test failed and teardown function was not executed. DeleteMany will not break if records are not found in the database
  await prisma.user.deleteMany({
    where: { dni: { in: [testUserData.admin.dni, testUserData.user.dni] } },
  })
  await prisma.topic.deleteMany({ where: { slug: 'testing' } })
  await prisma.category.deleteMany({ where: { slug: 'testing' } })

  await prisma.user.createMany({
    data: [testUserData.admin, testUserData.user, testUserData.inactiveUser],
  })
  const testCategory = await prisma.category.create({
    data: {
      name: 'Testing',
      slug: 'testing',
    },
  })

  await prisma.topic.create({
    data: {
      name: 'Testing',
      slug: 'testing',
      categoryId: testCategory.id,
    },
  })
}

export const teardown = async () => {
  await prisma.user.deleteMany({
    where: { dni: { in: [testUserData.admin.dni, testUserData.user.dni] } },
  })
  await prisma.topic.deleteMany({ where: { slug: 'testing' } })
  await prisma.category.deleteMany({ where: { slug: 'testing' } })
  server.close()
}
