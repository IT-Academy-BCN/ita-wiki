import { IncomingMessage, Server, ServerResponse } from 'http'
import { prisma } from "../prisma/client"
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
    password: 'testingPswd1'
  },
  admin: {
    email: 'testingAdmin@user.cat',
    name: 'testingAdmin',
    dni: '22222222B',
    password: 'testingPswd2',
    role: "ADMIN",
  }
}

export const setup = async () => {
  // First delete in case a test failed and teardown function was not executed. DeleteMany will not break if records are not found in the database
  await prisma.user.deleteMany({
    where: { dni: { in: [testUserData.admin.dni, testUserData.user.dni] } }
  })
  await prisma.topic.deleteMany({ where: { slug: 'testing' } })
  await prisma.category.deleteMany({ where: { slug: 'testing' } })

  await prisma.user.createMany({
    data: [testUserData.admin, testUserData.user]
  })
  const testCategory = await prisma.category.create({
    data: {
      name: "Testing",
      slug: "testing"
    }
  })

  await prisma.topic.create({
    data: {
      name: 'Testing',
      slug: 'testing',
      categoryId: testCategory.id
    }
  })

}

export const teardown = async () => {
  await prisma.user.deleteMany({
    where: { dni: { in: [testUserData.admin.dni, testUserData.user.dni] } }
  })
  await prisma.topic.deleteMany({ where: { slug: 'testing' } })
  await prisma.category.deleteMany({ where: { slug: 'testing' } })
  server.close()
}