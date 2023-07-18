// import supertest from 'supertest'
// import { expect, it, describe, afterAll, beforeAll } from 'vitest'
// import { USER_ROLE, USER_STATUS, User } from '@prisma/client'
// import { server } from '../globalSetup'
// import { prisma } from '../../prisma/client'
// import { pathRoot } from '../../routes/routes'
// import { authToken } from '../setup'

// let sampleUser: User | null

// beforeAll(async () => {
//   await prisma.user.create({
//     data: {
//       email: 'sampleUser1@sampleUser.com',
//       name: 'sampleUser1',
//       dni: '99999999Z',
//       password: 'samplePassword1',
//       role: USER_ROLE.REGISTERED,
//       status: USER_STATUS.ACTIVE,
//     },
//   })
//   sampleUser = await prisma.user.findUnique({
//     where: { email: 'sampleUser1@sampleUser.com' },
//   })
// })

// afterAll(async () => {
//   await prisma.user.deleteMany({
//     where: { email: 'sampleUser1@sampleUser.com' },
//   })
// })

// describe('Testing user patch endpoint', () => {
//   it.only('Should return error if no token is provided', async () => {
//     const modifiedUser = {
//       id: sampleUser!.id,
//       dni: '00000000A',
//     }
//     const response = await supertest(server)
//       .patch(`${pathRoot.v1.users}`)
//       .send({
//         modifiedUser,
//       })

//     expect(response.status).toBe(401)
//     expect(response.body.error).toBe('Unauthorized: Missing token')
//   })
//   it('Only an ADMIN user should succeed patching a user', async () => {
//     sampleUser = await prisma.user.findUnique({
//       where: { email: 'sampleUser1@sampleUser.com' },
//     })
//     const modifiedUser = {
//       id: sampleUser!.id,
//       dni: '00000000A',
//     }

//     const response = await supertest(server)
//       .patch(`${pathRoot.v1.users}`)
//       .set('Cookie', authToken.admin)
//       .send(modifiedUser)
//     // console.log('response: ', response)
//     const updatedUser = await prisma.user.findUnique({
//       where: { id: sampleUser!.id },
//     })
//     console.log('updatedUser: ', updatedUser)

//     expect(updatedUser!.dni).toBe(modifiedUser.dni)
//     expect(response.status).toBe(204)
//   })
// })
