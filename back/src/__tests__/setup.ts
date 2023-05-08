import { User } from '@prisma/client'
import { beforeAll, afterAll } from 'vitest'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { app } from '../server'
import { prisma } from '../prisma/client'

// eslint-disable-next-line import/no-mutable-exports
export let server: Server<typeof IncomingMessage, typeof ServerResponse>
// eslint-disable-next-line import/no-mutable-exports
export let sampleUser: User

beforeAll(async () => {
  server = app.listen()
  sampleUser = await prisma.user.create({data: {
    name: "sampleUser",
    dni: "19287364Q",
    email: "test@example.cat",
    password: "sampleUser1",
  }})
})

afterAll(() => {
  server.close()
  prisma.user.delete({
    where: {email: sampleUser.email}
  })
})
