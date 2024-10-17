import supertest from 'supertest'
import { afterEach, describe, expect, it } from 'vitest'
import qs from 'qs'
import { userSchema } from '../../schemas'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import db from '../../db/knexClient'

const route = `${pathRoot.v1.users}`

const adminIdData = await db('user')
  .select('id')
  .where({ dni: testUserData.admin.dni })
  .first()
const userIdData = await db('user')
  .select('id')
  .where({ dni: testUserData.user.dni })
  .first()
const deletedUserIdData = await db('user')
  .select('id')
  .where({ dni: testUserData.userToDelete.dni })
  .first()
const { id } = adminIdData
const { id: userId } = userIdData
const { id: deletedUserId } = deletedUserIdData

const responseSchema = userSchema.pick({ id: true, name: true }).array()

const stringData = (data: string[]) =>
  qs.stringify(
    { id: data, fields: ['id', 'name'] },
    { indices: false, arrayFormat: 'comma' }
  )
afterEach(async () => {
  await db('user')
    .update({ deleted_at: null })
    .where({ dni: testUserData.userToDelete.dni })
})
describe('Testing get users name by Id endpoint', () => {
  it('returns a user successfully with a single valid ID', async () => {
    const response = await supertest(server).get(`${route}?${stringData(id)}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('returns multiple users successfully with multiple valid IDs', async () => {
    const response = await supertest(server).get(
      `${route}?${stringData([id, userId])}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('returns a single user for duplicate IDs in the request', async () => {
    const response = await supertest(server).get(
      `${route}?${stringData([id, id, id])}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(responseSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('returns a empty array when the ID is not found', async () => {
    const response = await supertest(server).get(
      `${route}?${stringData(['m9ftb049xe9sit7155al0mpk'])}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

  it('fails with a Zod validation error when ID is an empty string', async () => {
    const response = await supertest(server).get(`${route}?${stringData([''])}`)
    expect(response.status).toBe(400)
    expect(response.body).toStrictEqual({
      message: [
        {
          validation: 'cuid2',
          code: 'invalid_string',
          message: 'Invalid cuid2',
          path: ['query', 'id', 0],
        },
      ],
    })
  })

  it('returns an empty array if the user is deleted', async () => {
    await db('user')
      .update({ deleted_at: new Date() })
      .where({ dni: testUserData.userToDelete.dni })

    const response = await supertest(server).get(
      `${route}?${stringData([deletedUserId])}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

  it('returns just the not deleted user', async () => {
    await db('user')
      .update({ deleted_at: new Date() })
      .where({ dni: testUserData.userToDelete.dni })
    const response = await supertest(server).get(
      `${route}?${stringData([deletedUserId, id])}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })
})
