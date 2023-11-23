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
export const itinerariesData = [
  { name: 'Frontend Angular', slug: 'frontend-angular' },
  { name: 'Frontend React', slug: 'frontend-react' },
  { name: 'Backend Java', slug: 'backend-java' },
  { name: 'Backend Node.js', slug: 'backend-nodejs' },
  { name: 'Full Stack PHP', slug: 'full-stack-php' },
  { name: 'Data Science', slug: 'data-science' },
]

export async function setup() {
  await client.query('DROP TABLE IF EXISTS "user" CASCADE')
  await client.query('DROP TABLE IF EXISTS "itinerary" CASCADE')
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
  
  CREATE TABLE IF NOT EXISTS itinerary (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
  );

  ALTER TABLE "user"
  ADD COLUMN itinerary_id TEXT NOT NULL REFERENCES itinerary(id);
`)

  // Cleanup database
  await client.query('DELETE FROM "user"')

  // Create required test data

  const [
    userItineraryId,
    mentorItineraryId,
    inactiveUserItineraryId,
    adminUserItineraryId,
  ] = await Promise.all(
    itinerariesData.map(async (itinerary) => {
      const itineraryId = generateId()
      const query = `
        INSERT INTO "itinerary" (id, name, slug)
        VALUES ($1, $2, $3)
        ON CONFLICT (slug) DO NOTHING;`
      await client.query(query, [itineraryId, itinerary.name, itinerary.slug])
      return itineraryId
    })
  )

  // Create users with itinerary assignments
  const userCreationPromises = Object.values(testUserData).map(async (user) => {
    let itineraryId: string | null = null
    if (user.email === 'testingUser@user.cat') {
      itineraryId = userItineraryId
    } else if (user.email === 'testingMentor@user.cat') {
      itineraryId = mentorItineraryId
    } else if (user.email === 'testingInactiveUser@user.cat') {
      itineraryId = inactiveUserItineraryId
    } else if (user.email === 'testingAdmin@user.cat') {
      itineraryId = adminUserItineraryId
    }

    const query = `
      INSERT INTO "user" (id, dni, email, password, user_meta, itinerary_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (dni) DO NOTHING;`
    await client.query(query, [
      generateId(),
      user.dni,
      user.email,
      await hashPassword(user.password),
      user.user_meta,
      itineraryId,
    ])
  })

  await Promise.all(userCreationPromises)
}

export async function teardown() {
  // Cleanup database
  await client.query('DELETE FROM "user"')
  await client.query('DELETE FROM "itinerary"')
  await client.end()
  server.close()
}
