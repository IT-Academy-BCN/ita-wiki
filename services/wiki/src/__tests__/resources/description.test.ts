import supertest from 'supertest'
import { describe, it, expect } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { authToken } from '../mocks/ssoHandlers/authToken'
import { checkInvalidToken } from '../helpers/checkInvalidToken'

const url: string = `${pathRoot.v1.resources}/generate-description`
const urlToTest: string = 'http://www.example.com'
const topic: string = 'Testing topic'
const title: string = 'Test title'

describe('Resources Generate Description', () => {
  it('responds with a 200 status code and a description', async () => {
    const response = await supertest(server)
      .post(`${url}?language=en`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ url: urlToTest, topic, title })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('description')
  })
  it('should fail is language param is missing', async () => {
    const response = await supertest(server)
      .post(`${url}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ url: urlToTest, title, topic })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Language parameter is required')
  })
  it('should fail with missing params (title, url, topic)', async () => {
    const response = await supertest(server)
      .post(`${url}?language=en`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({})

    expect(response.status).toBe(400)
    // expect(response.body.error).toBe('All parameters are required')
  })

  it('should fail if missing title', async () => {
    const response = await supertest(server)
      .post(`${url}?language=en`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ url: 'http://example.com', topic: 'Testing topic' })

    expect(response.status).toBe(400)
    // expect(response.body.error).toBe('All parameters are required')
  })

  it('should fail if missing url', async () => {
    const response = await supertest(server)
      .post(`${url}?language=en`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ title: 'Test Title', topic: 'Testing topic' })

    expect(response.status).toBe(400)
    // expect(response.body.error).toBe('All parameters are required')
  })

  it('should fail if missing topic', async () => {
    const response = await supertest(server)
      .post(`${url}?language=en`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ title: 'Test Title', url: 'http://example.com' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('All parameters are required')
  })
  it('Should return error 401 if no token is provided', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .send({ url: urlToTest, title, topic })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  checkInvalidToken(`${pathRoot.v1.resources}`, 'post', {
    url: urlToTest,
    title,
    topic,
  })
})
