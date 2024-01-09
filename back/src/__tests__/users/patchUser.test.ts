import supertest from 'supertest'
import { expect, it, describe, afterEach, beforeEach } from 'vitest'
import { USER_ROLE, USER_STATUS, User } from '@prisma/client'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { userPatchSchema } from '../../schemas'
import { authToken } from '../mocks/ssoServer'

let sampleUser: User

beforeEach(async () => {
  sampleUser = await prisma.user.create({
    data: {
      name: 'sampleUser1',
      role: USER_ROLE.REGISTERED,
      status: USER_STATUS.ACTIVE,
    },
  })
})

afterEach(async () => {
  await prisma.user.deleteMany({
    where: {
      OR: [{ name: 'sampleUser1' }, { name: 'UpdatedSampleUser' }],
    },
  })
})

describe('Testing user patch endpoint', () => {
  it('Should return error if no token is provided', async () => {
    const response = await supertest(server).patch(`${pathRoot.v1.users}`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  it('Check invalid token', async () => {
    checkInvalidToken(`${pathRoot.v1.users}`, 'patch', {
      id: sampleUser!.id,
      role: USER_ROLE.MENTOR,
    })
  })

  it('Should NOT be able to access if user level is not ADMIN', async () => {
    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.mentor}`])
    expect(response.status).toBe(403)
  })
  it('An ADMIN user should be able to access the endpoint without updating the user', async () => {
    const modifiedUser = {
      id: sampleUser!.id,
      role: USER_ROLE.MENTOR,
    }

    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(modifiedUser)

    expect(response.status).toBe(204)
  })
  it('An ADMIN user should be able to update user data', async () => {
    const modifiedUser = {
      id: sampleUser.id,
      name: 'UpdatedSampleUser',
      status: USER_STATUS.INACTIVE,
      updatedAt: new Date().toISOString(),
    }
    expect(userPatchSchema.safeParse(modifiedUser).success).toBeTruthy()
    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(modifiedUser)

    expect(response.status).toBe(204)
  })
  it.skip('User patch should fail if attempted with duplicate data', async () => {
    const modifiedUser = {
      id: sampleUser!.id,
      name: 'UpdatedSampleUser',
    }
    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(modifiedUser)
    expect(response.status).toBe(409)
  })
  it.skip('User patch should fail if attempted with invalid data', async () => {
    const modifiedUser = {
      id: sampleUser!.id,
      name: 'UpdatedSampleUser',
      dni: '8X',
    }
    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(modifiedUser)

    expect(response.status).toBe(400)
  })
})
