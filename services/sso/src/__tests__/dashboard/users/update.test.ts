import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { hashPassword } from '../../../utils/passwordHash'
import { dashboardLoginAndGetToken } from '../../helpers/testHelpers'
import { UserRole } from '../../../schemas'
import { UserStatus } from '../../../schemas/users/userSchema'
import db from '../../../db/knexClient'

const id = 'nmfg3bvexwotarwcpl6t5qjy'
const route = `${pathRoot.v1.dashboard.users}`
let adminAuthToken = ''
let mentorAuthToken = ''
const otherUserId = 'a9wqcteu833aii7gfqa6lq24'
const adminUserIdWithSameItineraryId = 'pvqu5cab173nac38jmesqjo2'

beforeAll(async () => {
  adminAuthToken = await dashboardLoginAndGetToken(
    testUserData.admin.dni,
    testUserData.admin.password
  )
  mentorAuthToken = await dashboardLoginAndGetToken(
    testUserData.mentor.dni,
    testUserData.mentor.password
  )

  const mentorItinerary = await db('user').select('itinerary_id').where({
    dni: testUserData.mentor.dni,
  })
  const mentorItineraryId = mentorItinerary[0].itinerary_id

  const otherItinerary = await db('itinerary')
    .select('id')
    .whereNot({ id: mentorItineraryId })
    .limit(1)

  const itineraryId = otherItinerary[0].id

  await db('user')
    .insert({
      id,
      dni: 'Y1868974P',
      email: 'example@example.com',
      name: 'nameExample',
      password: hashPassword('hashedPassword'),
      role: UserRole.REGISTERED,
      status: UserStatus.ACTIVE,
      user_meta: {},
      itinerary_id: mentorItineraryId,
    })
    .returning('id')

  await db('user')
    .insert({
      id: otherUserId,
      dni: 'Y1868976R',
      email: 'otherItinerary@example.com',
      name: 'otherItineraryName',
      password: hashPassword('hashedPassword'),
      role: UserRole.REGISTERED,
      status: UserStatus.ACTIVE,
      user_meta: {},
      itinerary_id: itineraryId,
    })
    .returning('id')

  await db('user')
    .insert({
      id: adminUserIdWithSameItineraryId,
      dni: '81486658G',
      email: 'adminexample@example.com',
      name: 'AdminNameExample',
      password: hashPassword('hashedPassword'),
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      user_meta: {},
      itinerary_id: itineraryId,
    })
    .returning('id')
})

afterAll(async () => {
  await db('user')
    .whereIn('id', [id, otherUserId, adminUserIdWithSameItineraryId])
    .del()
})

describe('Testing patch dashboard endpoint', () => {
  it('should update the user successfully', async () => {
    const body = {
      name: 'newUserName',
      email: 'example@get.com',
    }
    const response = await supertest(server)
      .patch(`${route}/${id}`)
      .set('Cookie', [adminAuthToken])
      .send(body)

    const newData = await db('user').select('name', 'email').where({ id })

    expect(response.status).toBe(204)
    expect(body.name).toBe(newData[0].name)
    expect(body.email).toBe(newData[0].email)
  })

  it('should return an error if the user does not exist', async () => {
    const nonExistingUserId = 'nthtnkrnwuvfpflw87r9fnx9'
    const body = { name: 'nonExistingUser', email: 'email@example.com' }
    const response = await supertest(server)
      .patch(`${route}/${nonExistingUserId}`)
      .set('Cookie', [adminAuthToken])
      .send(body)

    expect(response.status).toBe(404)
  })

  it('should return an error if no valid fields are provided for update', async () => {
    const body = { invalidField: 'value' }
    const response = await supertest(server)
      .patch(`${route}/${id}`)
      .set('Cookie', [adminAuthToken])
      .send(body)

    expect(response.status).toBe(400)
  })
})

describe('Testing patch dashboard endpoint with restrictMentorPatch middleware', () => {
  it('should update the user successfully by mentor for the same itinerary', async () => {
    const body = {
      name: 'newUserNameByMentor',
      email: 'exampleByMentor@get.com',
    }
    const response = await supertest(server)
      .patch(`${route}/${id}`)
      .set('Cookie', [mentorAuthToken])
      .send(body)

    const newData = await db('user').select('name', 'email').where({ id })

    expect(response.status).toBe(204)
    expect(body.name).toBe(newData[0].name)
    expect(body.email).toBe(newData[0].email)
  })

  it('should allow mentor to update their own information except role and status', async () => {
    const body = {
      name: 'updatedMentorName',
      email: 'updatedMentor@example.com',
    }
    const response = await supertest(server)
      .patch(`${route}/${testUserData.mentor.id}`)
      .set('Cookie', [mentorAuthToken])
      .send(body)

    const newData = await db('user')
      .select('name', 'email')
      .where('id', '=', testUserData.mentor.id)

    expect(response.status).toBe(204)
    expect(body.name).toBe(newData[0].name)
    expect(body.email).toBe(newData[0].email)
  })

  it('should return an error if mentor tries to update their own role or status', async () => {
    const body = {
      role: 'ADMIN',
      status: 'INACTIVE',
    }
    const response = await supertest(server)
      .patch(`${route}/${testUserData.mentor.id}`)
      .set('Cookie', [mentorAuthToken])
      .send(body)

    expect(response.status).toBe(403)
  })

  it('should return an error if mentor tries to update user of different itinerary', async () => {
    const body = {
      name: 'differentItineraryUser',
      email: 'diffItinerary@example.com',
    }
    const response = await supertest(server)
      .patch(`${route}/${otherUserId}`)
      .set('Cookie', [mentorAuthToken])
      .send(body)

    expect(response.status).toBe(403)
  })

  it('should return an error if mentor tries to modify the role field', async () => {
    const body = { role: 'ADMIN', name: 'roleChangeAttempt' }
    const response = await supertest(server)
      .patch(`${route}/${id}`)
      .set('Cookie', [mentorAuthToken])
      .send(body)

    expect(response.status).toBe(403)
  })
  it('should return an error if user is not found', async () => {
    const nonExistingUserId = 'ogmlkaiibztt5u6t3tw3cik0'
    const body = { name: 'nonExistingUser', email: 'email@example.com' }
    const response = await supertest(server)
      .patch(`${route}/${nonExistingUserId}`)
      .set('Cookie', [mentorAuthToken])
      .send(body)

    expect(response.status).toBe(404)
  })

  it('should return an error if mentor tries to update a non-registered user', async () => {
    const body = {
      name: 'updateNonRegisteredUser',
      email: 'updateNonReg@example.com',
    }
    const response = await supertest(server)
      .patch(`${route}/${adminUserIdWithSameItineraryId}`)
      .set('Cookie', [mentorAuthToken])
      .send(body)

    expect(response.status).toBe(403)
  })

  it('should return an error if user is not found', async () => {
    const nonExistingUserId = 'ogmlkaiibztt5u6t3tw3cik0'
    const body = { name: 'nonExistingUser', email: 'email@example.com' }
    const response = await supertest(server)
      .patch(`${route}/${nonExistingUserId}`)
      .set('Cookie', [mentorAuthToken])
      .send(body)

    expect(response.status).toBe(404)
  })
})
