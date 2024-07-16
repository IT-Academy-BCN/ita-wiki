import supertest from 'supertest'
import { expect, it, describe, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { tokenSchema } from '../../schemas/tokens/tokenSchema'
import { client } from '../../db/client'

const route = `${pathRoot.v1.auth}/login`
afterAll(async () => {
  await client.query('UPDATE "user" SET deleted_at = $1 WHERE dni = $2', [
    null,
    testUserData.userToDelete.dni,
  ])
})

describe('Testing authentication endpoint', () => {
  it('should succeed with correct credentials', async () => {
    const response = await supertest(server).post(route).send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should succeed with correct credentials and uppercase DNI', async () => {
    const response = await supertest(server).post(route).send({
      dni: testUserData.admin.dni.toUpperCase(),
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should succeed with correct credentials and lowercase DNI', async () => {
    const response = await supertest(server).post(route).send({
      dni: testUserData.admin.dni.toLowerCase(),
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should fail with incorrect password', async () => {
    const response = await supertest(server).post(route).send({
      dni: testUserData.admin.dni,
      password: 'wrong password',
    })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })

  it('should fail with user not found', async () => {
    const response = await supertest(server).post(route).send({
      dni: '92149467J',
      password: 'password1',
    })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })

  it('should fail if user not active', async () => {
    const response = await supertest(server).post(route).send({
      dni: testUserData.pendingUser.dni,
      password: testUserData.pendingUser.password,
    })
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Only active users can login')
  })

  it('should fail if user is blocked', async () => {
    const response = await supertest(server).post(route).send({
      dni: testUserData.blockedUser.dni,
      password: testUserData.blockedUser.password,
    })
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('The user is Blocked')
  })

  it('should fail if user is deleted', async () => {
    await client.query(
      'UPDATE "user" SET deleted_at = CURRENT_TIMESTAMP WHERE dni = $1',
      [testUserData.userToDelete.dni]
    )
    const response = await supertest(server).post(route).send({
      dni: testUserData.userToDelete.dni,
      password: testUserData.userToDelete.password,
    })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
})
