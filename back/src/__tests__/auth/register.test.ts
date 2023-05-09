import supertest from 'supertest'
import { expect, test, describe, afterAll } from 'vitest'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'


afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: 'example2@example.com' }
  })
})
describe('Testing registration endpoint', () => {
  test('should succeed with correct credentials', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/register`)
      .send({
        dni: '45632452b',
        name: 'Example2',
        email: 'example2@example.com',
        password: 'password1',
        specialization: 'backend',
      })
    expect(response.status).toBe(204)
  })

  describe('should fail with duplicate', () => {
    test('should fail with duplicate: DNI', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452b',
          name: 'Example2',
          email: 'anotherexample@example.com',
          password: 'password1',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('DNI already exists')
    })

    test('should fail with duplicate: email', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452c',
          name: 'Example2',
          email: 'example2@example.com',
          password: 'password1',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Email already exists')
    })
  })

  describe("should fail with missing required fields", () => {
    test('should fail with missing required fields: dni', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          name: 'Example2',
          email: 'example2@example.com',
          password: 'password1',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('dni')
    })

    test('should fail with missing required fields: email', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452c',
          name: 'Example2',
          password: 'password1',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('email')
    })

    test('should fail with missing required fields: password', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452c',
          name: 'Example2',
          email: 'example2@example.com',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('password')
    })

    test('should fail with missing required fields: specialization', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452c',
          name: 'Example2',
          email: 'example2@example.com',
          password: 'password1'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('specialization')
    })
  })

  describe('should fail with invalid input', () => {
    test('should fail with invalid input: dni', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: 'notRealDNI',
          name: 'Example2',
          email: 'example2@example.com',
          password: 'password1',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].validation).toBe('regex')
      expect(response.body.message[0].path).toContain('dni')
    })

    test('should fail with invalid input: email', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452c',
          name: 'Example2',
          email: 'notAValidEmail',
          password: 'password1',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].validation).toBe('email')
      expect(response.body.message[0].path).toContain('email')
    })

    test('should fail with invalid input: password too short', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452c',
          name: 'Example2',
          email: 'example2@example.com',
          password: 'pswd1',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].path).toContain('password')
      expect(response.body.message[0].code).toBe('too_small')
    })

    test('should fail with invalid input: password has no numbers', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452c',
          name: 'Example2',
          email: 'example2@example.com',
          password: 'password',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].validation).toBe('regex')
      expect(response.body.message[0].path).toContain('password')
    })

    test('should fail with invalid input: password contains non-alfanumeric', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.auth}/register`)
        .send({
          dni: '45632452c',
          name: 'Example2',
          email: 'example2@example.com',
          password: 'password1?',
          specialization: 'backend'
        })
      expect(response.status).toBe(400)
      expect(response.body.message[0].validation).toBe('regex')
      expect(response.body.message[0].path).toContain('password')
    })
  })
})