import supertest from 'supertest'
import { expect, it, describe, beforeAll } from 'vitest'
import { Category } from '@prisma/client'
import { server } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'

describe('Testing topics endpoint', () => {
  describe('With no query parameteres', () => {
    it('Should respond OK status and return topics as an array.', async () => {
      // At least a testing topic has been created for this test on globalSetup.
      const response = await supertest(server).get(`${pathRoot.v1.topics}`)

      expect(response.status).toBe(200)
      expect(response.body.topics).toBeInstanceOf(Array)
      expect(response.body.topics.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.objectContaining({
          topics: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              slug: expect.any(String),
              categoryId: expect.any(String),
            }),
          ]),
        })
      )
    })
  })
  describe('Filtering by category', () => {
    let category: Category
    beforeAll(async () => {
      // A testing Topic on testing Category has been created for this test on globalSetup.
      category = (await prisma.category.findUnique({
        where: { name: 'Testing' },
      })) as Category
    })

    it('Should respond OK status and return topics as an array. when categoryId given', async () => {
      const response = await supertest(server)
        .get(`${pathRoot.v1.topics}`)
        .query({ categoryId: category.id })

      expect(response.status).toBe(200)
      expect(response.body.topics).toBeInstanceOf(Array)
      expect(response.body.topics.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.objectContaining({
          topics: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              slug: expect.any(String),
              categoryId: expect.any(String),
            }),
          ]),
        })
      )
    })
    it('Should respond OK status and return topics as an array. when category slug given', async () => {
      const response = await supertest(server)
        .get(`${pathRoot.v1.topics}`)
        .query({ slug: category.slug })

      expect(response.status).toBe(200)
      expect(response.body.topics).toBeInstanceOf(Array)
      expect(response.body.topics.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.objectContaining({
          topics: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              slug: expect.any(String),
              categoryId: expect.any(String),
            }),
          ]),
        })
      )
    })

    it('If both categoryId and slug is given, should search by categoryId', async () => {
      // since this slug does not exist, result will be an array greaten than 0
      const response = await supertest(server)
        .get(`${pathRoot.v1.topics}`)
        .query({
          categoryId: category.id,
          slug: 'this-slug-does-not-exist',
        })

      expect(response.status).toBe(200)
      expect(response.body.topics).toBeInstanceOf(Array)
      expect(response.body.topics.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.objectContaining({
          topics: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              slug: expect.any(String),
              categoryId: expect.any(String),
            }),
          ]),
        })
      )
    })
    describe('Testing fail cases', () => {
      it('Should 404 if category is not found, by slug', async () => {
        const response = await supertest(server)
          .get(`${pathRoot.v1.topics}`)
          .query({ slug: 'no-category-with-this-slug' })

        expect(response.status).toBe(404)
        expect(response.body.message).toBe('No category found with this slug')
      })
    })
  })
})
