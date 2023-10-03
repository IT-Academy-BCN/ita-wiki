import supertest from 'supertest'
import { expect, test, describe, beforeAll, vi } from 'vitest'
// import pino from 'pino'
import { Category } from '@prisma/client'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
// import { PinoLogger } from '../../helpers/PinoLogger'
// import { config } from '../../helpers/pinoConfig'

let existingTestCategory: Category | null

beforeAll(async () => {
  existingTestCategory = await prisma.category.findUnique({
    where: { name: 'Testing' },
  })
})

describe('should fail with duplicate', () => {
  test('should call logger with duplicate: DNI', async () => {
    // const options = { logger: pino() }
    // const logger = new PinoLogger(options.logger)
    // const mockfn = vi.fn().mockImplementation(logger.logError)
    const response = await supertest(server)
      .post(`${pathRoot.v1.auth}/register`)
      .send({
        dni: '11111111A',
        name: 'testingUser',
        email: 'testingUser@user.cat',
        password: 'testingPswd1',
        specialization: existingTestCategory!.id,
      })
    expect(response.status).toBe(409)
  })
})
