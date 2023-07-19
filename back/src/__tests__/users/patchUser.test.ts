import supertest from 'supertest'
import { expect, it, describe, afterEach, beforeEach } from 'vitest'
import { USER_ROLE, USER_STATUS, User } from '@prisma/client'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { authToken } from '../setup'

let sampleUser: User | null

beforeEach(async () => {
  try {
    await prisma.user.create({
      data: {
        email: 'sampleUser1@sampleUser.com',
        name: 'sampleUser1',
        dni: '99999999Z',
        password: 'samplePassword1',
        role: USER_ROLE.REGISTERED,
        status: USER_STATUS.ACTIVE,
      },
    })
  } catch (error) {
    console.error(error)
  }
})

afterEach(async () => {
  await prisma.user.deleteMany({
    where: {
      OR: [
        { email: 'sampleUser1@sampleUser.com' },
        { email: 'sampleUser2@sampleUser.com' },
      ],
    },
  })
})

describe('Testing user patch endpoint', () => {
  it('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.users}`)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Unauthorized: Missing token')
  })
  it('Should NOT be able to access if user level is not ADMIN', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.users}`)
      .set('Cookie', authToken.mentor)
    expect(response.status).toBe(403)
  })
  it('An ADMIN user should be able to access the endpoint without updating the user', async () => {
    sampleUser = await prisma.user.findUnique({
      where: { email: 'sampleUser1@sampleUser.com' },
    })
    const modifiedUser = {
      id: sampleUser!.id,
      role: USER_ROLE.MENTOR,
    }

    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', authToken.admin)
      .send(modifiedUser)

    expect(response.status).toBe(204)
  })
})
