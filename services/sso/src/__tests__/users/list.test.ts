import supertest from 'supertest'
import { afterEach, describe, expect, it } from 'vitest'
import qs from 'qs'
import { userSchema } from '../../schemas'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { client } from '../../db/client'

const route = `${pathRoot.v1.users}`
const adminIdData = await client.query(
  'SELECT id FROM "user" WHERE dni IN ($1) ',
  [testUserData.admin.dni]
)
const userIdData = await client.query(
  'SELECT id FROM "user" WHERE dni IN ($1) ',
  [testUserData.user.dni]
)
const deletedUserIdData = await client.query(
  'SELECT id FROM "user" WHERE dni IN ($1) ',
  [testUserData.userToDelete.dni]
)
const { id } = adminIdData.rows[0]
const { id: userId } = userIdData.rows[0]
const { id: deletedUserId } = deletedUserIdData.rows[0]
const responseSchema = userSchema.pick({ id: true, name: true }).array()
const stringData = (data: string[]) =>
  qs.stringify(
    { id: data, fields: ['id', 'name'] },
    { indices: false, arrayFormat: 'comma' }
  )
afterEach(async () => {
  await client.query('UPDATE "user" SET deleted_at = $1 WHERE dni = $2', [
    null,
    testUserData.userToDelete.dni,
  ])
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
    await client.query(
      'UPDATE "user" SET deleted_at = CURRENT_TIMESTAMP WHERE dni = $1',
      [testUserData.userToDelete.dni]
    )
    const response = await supertest(server).get(
      `${route}?${stringData([deletedUserId])}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

  it('returns just the not deleted user', async () => {
    await client.query(
      'UPDATE "user" SET deleted_at = CURRENT_TIMESTAMP WHERE dni = $1',
      [testUserData.userToDelete.dni]
    )
    const response = await supertest(server).get(
      `${route}?${stringData([deletedUserId, id])}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })
})
