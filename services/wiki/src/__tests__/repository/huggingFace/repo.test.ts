import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { HuggingFaceRepository } from '../../../repository/huggingFace/repo'
import { mswServer } from '../../mocks/mswServer'
import { generateTextHandler } from '../../mocks/huggingFaceHandlers'

describe('HuggingFaceRepository', () => {
  let repo: HuggingFaceRepository

  beforeEach(() => {
    mswServer.listen()
    repo = new HuggingFaceRepository()
    process.env.HF_API_ENDPOINT = 'https://mockapi.com/hf'
    process.env.HF_API_KEY = 'mockapikey'
    process.env.HF_RES_MAX_LENGTH = '300'
    process.env.HF_RES_TEMPERATURE = '0.7'
    process.env.HF_RES_TOP_P = '0.9'
    vi.resetAllMocks()
  })

  afterEach(() => mswServer.resetHandlers())

  it('should call the HuggingFace API and return the transformed response', async () => {
    mswServer.use(generateTextHandler)

    const result = await repo.getResponse('Test input')

    expect(result).toEqual({
      message: 'Mocked response for: Test input',
    })
  })

  it('should throw an error if the API response is invalid', async () => {
    mswServer.use(
      http.post('https://mockapi.com/hf', async () =>
        HttpResponse.json({ message: 'Error occurred' }, { status: 500 })
      )
    )

    await expect(repo.getResponse('Test input')).rejects.toThrow(
      'Internal Server Error'
    )
  })
})
