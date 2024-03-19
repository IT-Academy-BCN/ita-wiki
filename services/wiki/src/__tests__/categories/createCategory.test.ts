import supertest from 'supertest'
import { expect, it, describe, afterEach } from 'vitest'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'

const newCategory = { name: 'New Category' }
describe('Testing category POST method', () => {
  afterEach(async () => {
    await prisma.category.deleteMany({
      where: { name: newCategory.name },
    })
  })
  it('Should respond 204 status when creating a new category', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.categories}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send(newCategory)

    expect(response.status).toBe(204)
  })
  it('Should respond 409 if attempting to create a category with an already existing name', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.categories}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ name: 'Testing category' })

    expect(response.status).toBe(409)
  })
  it('Should not be able to create a new category if not admin user', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.categories}`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send(newCategory)

    expect(response.status).toBe(403)
  })
  it('Should return 401 status if no token is provided', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.categories}`)
      .send(newCategory)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })

  checkInvalidToken(`${pathRoot.v1.categories}`, 'post', newCategory)
})
