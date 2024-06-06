import { IncomingMessage, Server, ServerResponse } from 'http'
import fs from 'fs/promises'
import { app } from '../app'
import { client } from '../db/client'
import { generateId } from '../utils/cuidGenerator'
import { hashPassword } from '../utils/passwordHash'
import { UserRole, UserStatus } from '../schemas/users/userSchema'

// eslint-disable-next-line import/no-mutable-exports
export let server: Server<typeof IncomingMessage, typeof ServerResponse>
// eslint-disable-next-line prefer-const
server = app.listen()

export const testUserData = {
  user: {
    id: 'ayglpcuwwjou8r1m6fqv1fra',
    email: 'testingUser@user.cat',
    name: 'testingUser',
    dni: '38826335N',
    password: 'testingPswd1',
    role: UserRole.REGISTERED,
    status: UserStatus.ACTIVE,
    user_meta: {},
  },
  admin: {
    id: 'q28v1k1h9g8uk0pwzaek2hhx',
    email: 'testingAdmin@user.cat',
    name: 'testingAdmin',
    dni: '98917624Y',
    password: 'testingPswd2',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    user_meta: {},
  },
  mentor: {
    id: 'mdigzoil44gafwd5aaxbb90a',
    email: 'testingMentor@user.cat',
    name: 'testingMentor',
    dni: '34508651A',
    password: 'testingPswd4',
    role: UserRole.MENTOR,
    status: UserStatus.ACTIVE,
    user_meta: {},
  },
  pendingUser: {
    id: 'onk8ed4rzgscnac6rltyd8vs',
    email: 'testingPendingUser@user.cat',
    name: 'testingPendingUser',
    dni: 'Z4503536A',
    password: 'testingPswd3',
    role: UserRole.REGISTERED,
    status: UserStatus.PENDING,
    user_meta: {},
  },
  blockedUser: {
    id: 'bbiax2thm5usyfg7lus1sosp',
    email: 'testingBlockedUser@user.cat',
    name: 'testingBlockedUser',
    dni: '45744082A',
    password: 'testingPswd5',
    role: UserRole.REGISTERED,
    status: UserStatus.BLOCKED,
    user_meta: {},
  },
  userToBeBlocked: {
    id: 'jay0jlyn7p919e7uy4efbh7m',
    email: 'testingUserToBeBlocked@user.cat',
    name: 'testingUserToBeBlocked',
    dni: '90001685V',
    password: 'testingPswd6',
    role: UserRole.REGISTERED,
    status: UserStatus.ACTIVE,
    user_meta: {},
  },
  userToDelete: {
    id: 'b6z2od3ut12qs0ilem6njgjp',
    email: 'userToDelete@user.cat',
    name: 'userToDelete',
    dni: '45825710G',
    password: 'testingPswd7',
    role: UserRole.REGISTERED,
    status: UserStatus.ACTIVE,
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
  { name: 'Data Analytics', slug: 'data-analytics' },
]

export async function setup() {
  await client.query('DROP TABLE IF EXISTS "user" CASCADE')
  await client.query('DROP TABLE IF EXISTS "itinerary" CASCADE')

  const sqlContent = await fs.readFile('db/init.sql', 'utf8')
  await client.query(sqlContent)

  // Cleanup database
  await client.query('DELETE FROM "user"')

  // Create required test data

  const [
    userItineraryId,
    mentorItineraryId,
    pendingUserItineraryId,
    adminUserItineraryId,
    blockedUserItineraryId,
    userToBeBlockedItineraryId,
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
    } else if (user.email === 'testingPendingUser@user.cat') {
      itineraryId = pendingUserItineraryId
    } else if (user.email === 'testingAdmin@user.cat') {
      itineraryId = adminUserItineraryId
    } else if (user.email === 'testingBlockedUser@user.cat') {
      itineraryId = blockedUserItineraryId
    } else if (user.email === 'testingUserToBeBlocked@user.cat') {
      itineraryId = userToBeBlockedItineraryId
    } else if (user.email === 'userToDelete@user.cat') {
      itineraryId = mentorItineraryId
    }

    const query = `
      INSERT INTO "user" (id, dni, email, name, password, role, status, user_meta, itinerary_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (dni) DO NOTHING;`
    await client.query(query, [
      user.id,
      user.dni,
      user.email,
      user.name,
      await hashPassword(user.password),
      user.role,
      user.status,
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
