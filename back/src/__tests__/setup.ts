import supertest from 'supertest'
import { beforeAll } from 'vitest'
import { pathRoot } from '../routes/routes'
import { server, testUserData } from './globalSetup'

export const authToken: {
  admin: string
  mentor: string
  user: string
} = { admin: '', mentor: '', user: '' }

beforeAll(async () => {
  const responseAdmin = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  // eslint-disable-next-line prefer-destructuring
  authToken.admin = responseAdmin.header['set-cookie'][0].split(';')[0]

  const responseMentor = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.mentor.dni,
      password: testUserData.mentor.password,
    })
  // eslint-disable-next-line prefer-destructuring
  authToken.mentor = responseMentor.header['set-cookie'][0].split(';')[0]

  const responseUser = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.user.dni,
      password: testUserData.user.password,
    })
  // eslint-disable-next-line prefer-destructuring
  authToken.user = responseUser.header['set-cookie'][0].split(';')[0]
})
