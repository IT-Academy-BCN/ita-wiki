import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server } from '../globalSetup'
import { authToken } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'

describe('Testing resource modify endpoint', () => {
    //usuario propietario del recurso
    //endpoint equivocado
    //peticion incompleta
    test('should modify a resource with new Title', async () => {
        const newResource = {
            title: 'Test Resource',
            description: null,
            url: null,
            resourceType: null,
            topics: null,
        }

        const response = await supertest(server)
            .put(`${pathRoot.v1.resources}/`)
            //.set('Cookie', authToken.admin)
            .send(newResource)
        expect(response.status).toBe(204)
    })
})