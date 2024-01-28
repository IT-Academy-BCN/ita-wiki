import supertest from 'supertest'
import { expect, it, describe, afterEach, beforeEach } from 'vitest'
import { User } from '@prisma/client'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { userPatchSchema } from '../../schemas'
import { authToken } from '../mocks/ssoServer'
import { UserStatus } from '../../schemas/users/userSchema'

let sampleUser: User

beforeEach(async () => {
  sampleUser = await prisma.user.create({
    data: {
      name: 'sampleUser1',
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
    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .send({ id: sampleUser!.id })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  it('Check invalid token', async () => {
    checkInvalidToken(`${pathRoot.v1.users}`, 'patch', {
      id: sampleUser!.id,
    })
  })
  it('Should NOT be able to access if user level is not ADMIN', async () => {
    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.mentor}`])
      .send({ id: sampleUser!.id })
    expect(response.status).toBe(403)
    expect(response.body.message).toBe(
      "Access denied. You don't have permissions"
    )
  })
  it('User patch should success if attempted with duplicate data', async () => {
    const modifiedUser = {
      id: sampleUser!.id,
      name: 'UpdatedSampleUser',
    }
    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(modifiedUser)
    expect(response.status).toBe(204)
  })
  it('An ADMIN user should be able to access the endpoint without updating the user', async () => {
    const modifiedUser = {
      id: sampleUser!.id,
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
      status: UserStatus.INACTIVE,
    }
    expect(userPatchSchema.safeParse(modifiedUser).success).toBeTruthy()
    const response = await supertest(server)
      .patch(`${pathRoot.v1.users}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(modifiedUser)

    expect(response.status).toBe(204)
  })
  it('User patch should fail if attempted with invalid data', async () => {
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
