import supertest from 'supertest'
import { expect, it, describe } from 'vitest'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'

describe('Testing banners GET method', () => {
  it('Should respond OK status and return banners as an array.', async () => {
    const banner = {
      title: 'ITAcademy',
      description: 'Aprende a programar en 18 semanas y reprograma tu futuro',
      url: 'https://www.barcelonactiva.cat/es/itacademy',
    }
    await prisma.banners.create({ data: banner })
    const response = await supertest(server).get(`${pathRoot.v1.banners}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          description: expect.any(String),
          url: expect.any(String),
        }),
      ])
    )
  })
})
