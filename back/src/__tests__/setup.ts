import { User } from '@prisma/client'
import { beforeAll, afterAll } from 'vitest'
import { IncomingMessage, Server, ServerResponse } from 'http'
import supertest from 'supertest'
import { app } from '../server'
import { pathRoot } from '../routes/routes'
import { prisma } from '../prisma/client'

// eslint-disable-next-line import/no-mutable-exports
export let server: Server<typeof IncomingMessage, typeof ServerResponse>
// eslint-disable-next-line import/no-mutable-exports
export let authToken: string
// eslint-disable-next-line import/no-mutable-exports
export let testUser: User

beforeAll(async () => {
  server = app.listen()
  testUser = await prisma.user.create({
    data: {
      email: 'testing@user.cat',
      name: 'testingUser',
      dni: '19283746Q',
      password: 'testingPswd1'
    }
  })

  const response = await supertest(server).post(`${pathRoot.v1.auth}/login`).send({
    dni: testUser.dni,
    password: 'testingPswd1',
  })
  // eslint-disable-next-line prefer-destructuring
  authToken = response.header['set-cookie'][0].split(';')[0]
})

afterAll(async () => {
  await prisma.user.delete({
    where: { email: testUser.email }
  })
  server.close()
})
