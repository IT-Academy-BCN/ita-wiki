import supertest from 'supertest'
import { beforeAll, expect, it, describe } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { client } from '../../../models/db'

const route = `${pathRoot.v1.dashboard.users}`

let authAdminToken = ''

beforeAll(async () => {
  const loginRoute = `${pathRoot.v1.dashboard.auth}/login`
  const responseAdmin = await supertest(server).post(loginRoute).send({
    dni: testUserData.admin.dni,
    password: testUserData.admin.password,
  })
  ;[authAdminToken] = responseAdmin.header['set-cookie'][0].split(';')
})

describe('Testing dashboard delete endpoint', () => {
  it('should successfully DELETE a user using a query', async () => {
    const deleteDate = new Date()
    const userDni = testUserData.userToDelete.dni
    await client.query('UPDATE "user" SET deleted_at = $1 WHERE dni = $2', [
      deleteDate,
      userDni,
    ])

    const data = await client.query(
      'SELECT deleted_at FROM "user" WHERE dni = $1',
      [userDni]
    )
    const userDeleteDate = data.rows[0].deleted_at
    expect(userDeleteDate).toStrictEqual(deleteDate)
  })
  it('should successfully DELETE a user', async () => {
    const id = await client.query('SELECT id FROM "user" WHERE dni = $1', [
      testUserData.userToDelete.dni,
    ])
    const userId = id.rows[0].id
    const response = await supertest(server).delete(`${route}/${userId}`)

    expect(response.status).toBe(410)
    expect(response.body.message).toBe('User deleted')
  })
})
