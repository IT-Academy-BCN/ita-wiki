import { IncomingMessage, Server, ServerResponse } from 'http'
import { prisma } from '../prisma/client'
import { app } from '../server'
import { UserRole, UserStatus } from '../schemas/users/userSchema'

// eslint-disable-next-line import/no-mutable-exports
export let server: Server<typeof IncomingMessage, typeof ServerResponse>
// eslint-disable-next-line prefer-const
server = app.listen()

export const testUserData = {
  user: {
    id: 'vwt15uwddul2afme75x6fs8q',
    email: 'testingUser@user.cat',
    name: 'testingUser',
    dni: '11111111A',
    password: 'testingPswd1',
    role: UserRole.REGISTERED,
    status: UserStatus.ACTIVE,
    avatarId: null,
  },
  admin: {
    id: 'ph4c1vq7s4hszoxbbwx4c2wd',
    email: 'testingAdmin@user.cat',
    name: 'testingAdmin',
    dni: '22222222B',
    password: 'testingPswd2',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    avatarId: null,
  },
  mentor: {
    id: 'qhpw2d4fykgcwiveh7mhfc3l',
    email: 'testingMentor@user.cat',
    name: 'testingMentor',
    dni: '44444444B',
    password: 'testingPswd4',
    role: UserRole.MENTOR,
    status: UserStatus.ACTIVE,
    avatarId: null,
  },
  inactiveUser: {
    id: 'wo3i34m29rhke1ptcwtmy3t2',
    email: 'testingInactiveUser@user.cat',
    name: 'testingInactiveUser',
    dni: '33333333A',
    password: 'testingPswd3',
    role: UserRole.REGISTERED,
    status: UserStatus.INACTIVE,
    avatarId: null,
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

  const { password, email, dni, role, status, ...admin } = testUserData.admin
  const {
    password: p0,
    email: e0,
    dni: d0,
    role: r0,
    status: s0,
    ...user
  } = testUserData.user
  const {
    password: p1,
    email: e1,
    dni: d1,
    role: r1,
    status: s1,
    ...mentor
  } = testUserData.mentor
  const {
    password: p2,
    email: e2,
    dni: d2,
    role: r2,
    status: s2,
    ...inactiveUser
  } = testUserData.inactiveUser
  await prisma.user.createMany({
    data: [
      { ...admin },
      { ...user },
      { ...mentor },
      {
        ...inactiveUser,
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
  await prisma.media.deleteMany({})
  await prisma.topicsOnResources.deleteMany({})
  await prisma.topic.deleteMany({})
  await prisma.viewedResource.deleteMany()
  await prisma.resource.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.category.deleteMany({})
  server.close()
}
