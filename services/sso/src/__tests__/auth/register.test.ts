import supertest from 'supertest'
import { expect, it, describe, afterAll, beforeAll, afterEach } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { client } from '../../models/db'
import { UserRegister } from '../../schemas/auth/registerSchema'

const route = `${pathRoot.v1.auth}/register`

let itineraryId: string = ''
let registerUser: UserRegister
beforeAll(async () => {
  const { rows } = await client.query('SELECT id FROM "itinerary" LIMIT 1')
  const [id] = rows
  itineraryId = id.id
  registerUser = {
    dni: '11111111Q',
    email: 'example@example.cat',
    name: 'Example',
    password: 'password1',
    confirmPassword: 'password1',
    itineraryId,
  }
})

afterEach(async () => {
  await client.query('DELETE FROM "user" WHERE dni IN ($1) ', ['11111111Q'])
})
afterAll(async () => {
  await client.query('DELETE FROM "user" WHERE dni IN ($1, $2) OR email = $3', [
    '11111111Q',
    '11111111S',
    'example@example.com',
  ])
})

describe('Testing registration endpoint', () => {
  it('should succeed with correct credentials', async () => {
    const response = await supertest(server).post(route).send(registerUser)
    expect(response.status).toBe(200)
    expect(response.body.id).toBeTypeOf('string')
  })
  it('should succeed with correct credentials and save DNI in uppercase', async () => {
    registerUser.dni = registerUser.dni.toLowerCase()
    const response = await supertest(server).post(route).send(registerUser)
    const query = await client.query('SELECT dni FROM "user" WHERE dni = $1', [
      registerUser.dni.toUpperCase(),
    ])
    expect(query.rows[0].dni).toBe(registerUser.dni.toUpperCase())
    expect(response.status).toBe(200)
    expect(response.body.id).toBeTypeOf('string')
  })
  describe('should fail with duplicate', () => {
    it('should fail with duplicate: DNI', async () => {
      const response = await supertest(server).post(route).send({
        dni: '11111111A',
        email: 'anotherexample@example.com',
        name: 'Example',
        password: 'password1',
        confirmPassword: 'password1',
        itineraryId,
      })
      expect(response.status).toBe(409)
      expect(response.body.message).toContain('email or dni already exists')
    })

    it('should fail with duplicate: email', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'testingUser@user.cat',
        name: 'Example',
        password: 'password1',
        confirmPassword: 'password1',
        itineraryId,
      })

      expect(response.status).toBe(409)
      expect(response.body.message).toBe('email or dni already exists')
    })
  })

  describe('should fail with missing required fields', () => {
    it('should fail with missing required fields: dni', async () => {
      const response = await supertest(server).post(route).send({
        email: 'example2@example.com',
        password: 'password1',
        confirmPassword: 'password1',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('dni')
    })

    it('should fail with missing required fields: email', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        password: 'password1',
        name: 'Example',
        confirmPassword: 'password1',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('email')
    })

    it('should fail with missing required fields: name', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        password: 'password1',
        confirmPassword: 'password1',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('name')
    })

    it('should fail with missing required fields: password', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        name: 'Example',
        confirmPassword: 'password1',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('password')
    })

    it('should fail with missing required fields: confirmPassword', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        name: 'Example',
        password: 'password1',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('confirmPassword')
    })
    it('should fail with missing required fields: itineraryId', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        name: 'Example',
        password: 'password1',
        confirmPassword: 'password1',
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Required')
      expect(response.body.message[0].path).toContain('itineraryId')
    })
  })

  describe('should fail with invalid input', () => {
    it('should fail with invalid input: dni', async () => {
      const response = await supertest(server).post(route).send({
        dni: 'notRealDNI',
        email: 'example2@example.com',
        name: 'Example',
        password: 'password1',
        confirmPassword: 'password1',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].validation).toBe('regex')
      expect(response.body.message[0].path).toContain('dni')
    })

    it('should fail with invalid input: email', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'notAValidEmail',
        name: 'Example',
        password: 'password1',
        confirmPassword: 'password1',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].validation).toBe('email')
      expect(response.body.message[0].path).toContain('email')
    })

    it('should fail with invalid input: password too short', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        name: 'Example',
        password: 'pswd1',
        confirmPassword: 'pswd1',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].path).toContain('password')
      expect(response.body.message[0].code).toBe('too_small')
    })

    it('should fail with invalid input: password has no numbers', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        name: 'Example',
        password: 'password',
        confirmPassword: 'password',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].validation).toBe('regex')
      expect(response.body.message[0].path).toContain('password')
    })

    it('should fail with invalid input: password contains non-alfanumeric', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        name: 'Example',
        password: 'password1?',
        confirmPassword: 'password1?',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].validation).toBe('regex')
      expect(response.body.message[0].path).toContain('password')
    })
    it('should fail with invalid input: passwords do not match', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        name: 'Example',
        password: 'password1',
        confirmPassword: 'password2',
        itineraryId,
      })
      expect(response.status).toBe(400)
      expect(response.body.message[0].message).toBe('Passwords must match')
      expect(response.body.message[0].path).toContain('confirmPassword')
    })
    it('should fail with non existing itineraryId', async () => {
      const response = await supertest(server).post(route).send({
        dni: '45632452c',
        email: 'example2@example.com',
        name: 'Example',
        password: 'password1',
        confirmPassword: 'password1',
        itineraryId: 'clpb25e1l000008jr7j505s0o',
      })
      expect(response.status).toBe(422)
      expect(response.body.message).toBe('Invalid itinerary')
    })
  })
})
