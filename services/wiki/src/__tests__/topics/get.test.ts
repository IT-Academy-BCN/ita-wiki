import supertest from 'supertest'
import { expect, it, describe, beforeAll } from 'vitest'
import { Category } from '@prisma/client'
import { server, testCategoryData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import db from '../../db/knex'

describe('Testing topics endpoint', () => {
  describe('With no query parameteres', () => {
    it('Should respond OK status and return topics as an array.', async () => {
      // At least a testing topic has been created for this test on globalSetup.
      const response = await supertest(server).get(`${pathRoot.v1.topics}`)

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
            category_id: expect.any(String),
          }),
        ])
      )
    })
  })
  describe('Filtering by category', () => {
    let category: Category
    beforeAll(async () => {
      // A testing Topic on testing Category has been created for this test on globalSetup.
      category = await db('category')
        .where({
          name: testCategoryData.name,
        })
        .first()
    })

    it('Should respond OK status and return topics as an array. when categoryId given', async () => {
      const response = await supertest(server)
        .get(`${pathRoot.v1.topics}`)
        .query({ categoryId: category.id })

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
            category_id: expect.any(String),
          }),
        ])
      )
    })

    it('Should respond OK status and return topics as an array. when category slug given', async () => {
      const response = await supertest(server)
        .get(`${pathRoot.v1.topics}`)
        .query({ slug: category.slug })

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
            category_id: expect.any(String),
          }),
        ])
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
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
            category_id: expect.any(String),
          }),
        ])
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
