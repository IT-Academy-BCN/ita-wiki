import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { hashPassword } from '../../../utils/passwordHash'
import { client } from '../../../db/client'
import { dashboardLoginAndGetToken } from '../../helpers/testHelpers'
import { UserRole } from '../../../schemas'
import { UserStatus } from '../../../schemas/users/userSchema'

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
  const mentorItineraryResult = await client.query(
    'SELECT itinerary_id FROM "user" WHERE dni = $1',
    [testUserData.mentor.dni]
  )
  const mentorItineraryId = mentorItineraryResult.rows[0].itinerary_id

  const otherItinerary = await client.query(
    'SELECT id FROM "itinerary" WHERE id != $1 LIMIT 1',
    [mentorItineraryId]
  )
  const itineraryId = otherItinerary.rows[0].id
  const createUserQuery = {
    text: 'INSERT INTO "user"(id, dni, email, name, password, role, status, user_meta, itinerary_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    values: [
      id,
      'Y1868974P',
      'example@example.com',
      'nameExample',
      hashPassword('hashedPassword'),
      UserRole.REGISTERED,
      UserStatus.ACTIVE,
      {},
      mentorItineraryId,
    ],
  }
  await client.query(createUserQuery)
  const createOtherItineraryUserQuery = {
    text: 'INSERT INTO "user"(id, dni, email, name, password, role, status, user_meta, itinerary_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
    values: [
      otherUserId,
      'Y1868976R',
      'otherItinerary@example.com',
      'otherItineraryName',
      hashPassword('hashedPassword'),
      UserRole.REGISTERED,
      UserStatus.ACTIVE,
      {},
      itineraryId,
    ],
  }
  await client.query(createOtherItineraryUserQuery)
  const createAdminWithSameItineraryQuery = {
    text: 'INSERT INTO "user"(id, dni, email, name, password, role, status, user_meta, itinerary_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
    values: [
      adminUserIdWithSameItineraryId,
      '81486658G',
      'adminexample@example.com',
      'AdminNameExample',
      hashPassword('hashedPassword'),
      UserRole.ADMIN,
      UserStatus.ACTIVE,
      {},
      itineraryId,
    ],
  }
  await client.query(createAdminWithSameItineraryQuery)
})

afterAll(async () => {
  await client.query('DELETE FROM "user" WHERE id IN ($1, $2, $3)', [
    id,
    otherUserId,
    adminUserIdWithSameItineraryId,
  ])
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

    const newData = await client.query(
      ' SELECT name, email FROM "user" WHERE id = $1',
      [id]
    )
    expect(response.status).toBe(204)
    expect(body.name).toBe(newData.rows[0].name)
    expect(body.email).toBe(newData.rows[0].email)
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

    const newData = await client.query(
      'SELECT name, email FROM "user" WHERE id = $1',
      [id]
    )
    expect(response.status).toBe(204)
    expect(body.name).toBe(newData.rows[0].name)
    expect(body.email).toBe(newData.rows[0].email)
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

    const newData = await client.query(
      'SELECT name, email FROM "user" WHERE id = $1',
      [testUserData.mentor.id]
    )
    expect(response.status).toBe(204)
    expect(body.name).toBe(newData.rows[0].name)
    expect(body.email).toBe(newData.rows[0].email)
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
