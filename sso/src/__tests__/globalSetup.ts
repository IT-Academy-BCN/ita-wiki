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
  await client.query('DROP TABLE IF EXISTS "user" CASCADE')
  await client.query(`
  CREATE OR REPLACE FUNCTION TRIGGER_SET_TIMESTAMP() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at := NOW();
RETURN NEW;
END;
$$LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS "user" (
    id TEXT PRIMARY KEY,
    dni VARCHAR(25) UNIQUE NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    user_meta JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW (),
    updated_at TIMESTAMPTZ
);

CREATE TRIGGER set_timestamp BEFORE
UPDATE ON "user" FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
`)

  // Cleanup database
  await client.query('DELETE FROM "user"')

  // Create required test data
  const userCreationPromises = Object.values(testUserData).map(async (user) => {
    const query = `
      INSERT INTO "user" (id, dni, email, password, user_meta)
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

  await Promise.all(userCreationPromises)
}

export async function teardown() {
  // Cleanup database
  await client.query('DELETE FROM "user"')
  await client.end()
  server.close()
}
