import { describe, it, vi, afterEach, beforeEach, expect } from 'vitest'
import supertest from 'supertest'
import 'dotenv/config'
import { pathRoot } from '../../routes/routes'
import { server } from '../globalSetup'
import { HuggingFaceRepository } from '../../repository/huggingFace'
import { TResponse } from '../../db/knexTypes'

const url: string = `${pathRoot.v1.resources}/generate-description`

describe('generateDescription Controller', () => {
  let huggingFaceRepository: HuggingFaceRepository
  beforeEach(() => {
    huggingFaceRepository = new HuggingFaceRepository()
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns a 400 error when a param is missing', async () => {
    const response = await supertest(server)
      .post(url)
      .send({
        url: 'https://github.com/test/repo',
        topic: 'Test Topic',
        language: 'en',
      })
      .expect(400)
      .expect('Content-Type', /json/)
    expect(response.body).toHaveProperty('message')
    expect(typeof response.body.message).toBe('object')
  })

  it('returns a 200 status when the Hugging Face API returns a successful response', async () => {
    vi.spyOn(huggingFaceRepository, 'getResponse').mockResolvedValueOnce({
      status: 200,
      generated_text: 'Test Description',
    } as unknown as TResponse)
    const response = await supertest(server)
      .post(url)
      .send({
        title: 'Test Title',
        url: 'https://github.com/test/repo',
        topic: 'Test Topic',
        language: 'en',
      })
      .expect(200)
      .expect('Content-Type', /json/)
    expect(response.body).toHaveProperty('message')
    expect(typeof response.body.message).toBe('string')
  })
})
