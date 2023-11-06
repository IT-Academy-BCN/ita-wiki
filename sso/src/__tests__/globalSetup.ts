import { IncomingMessage, Server, ServerResponse } from 'http'
import { app } from '../app'
import { client } from '../models/db'
import { generateId } from '../utils/cuidGenerator'
import { hashPassword } from '../utils/passwordHash'

// eslint-disable-next-line import/no-mutable-exports
export let server: Server<typeof IncomingMessage, typeof ServerResponse>
// eslint-disable-next-line prefer-const
server = app.listen()

export const testUserData = {
  user: {
    email: 'testingUser@user.cat',
    name: 'testingUser',
    dni: '11111111A',
    password: 'testingPswd1',
    user_meta: {},
  },
  admin: {
    email: 'testingAdmin@user.cat',
    name: 'testingAdmin',
    dni: '22222222B',
    password: 'testingPswd2',
    user_meta: {},
  },
  mentor: {
    email: 'testingMentor@user.cat',
    name: 'testingMentor',
    dni: '44444444B',
    password: 'testingPswd4',
    user_meta: {},
  },
  inactiveUser: {
    email: 'testingInactiveUser@user.cat',
    name: 'testingInactiveUser',
    dni: '33333333A',
    password: 'testingPswd3',
    user_meta: {},
  },
}

export async function setup() {
  // Cleanup database
  await client.query('DELETE FROM users')
  // Create required test data

  Object.values(testUserData).forEach(async (user) => {
    const query = `
      INSERT INTO users (id, dni, email, password, user_meta)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (dni) DO NOTHING;`

    await client.query(query, [
      generateId(),
      user.dni,
      user.email,
      await hashPassword(user.password),
      user.user_meta,
    ])
  })
}

export async function teardown() {
  // Cleanup database
  await client.query('DELETE FROM users')
  await client.end()
  server.close()
}
