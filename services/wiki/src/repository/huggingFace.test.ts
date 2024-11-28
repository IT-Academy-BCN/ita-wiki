import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HuggingFaceRepository } from './huggingFace'
import { TSupportedLanguage } from '../db/knexTypes'
import { inputToTest } from '../__tests__/globalSetup'

global.fetch = vi.fn()

describe('HuggingFaceRepository', () => {
  let repo: HuggingFaceRepository

  beforeEach(() => {
    process.env.HF_API_ENDPOINT = 'https://mockapi.com/hf'
    process.env.HF_API_KEY = 'mockapikey'
    process.env.HF_RES_MAX_LENGTH = '300'
    process.env.HF_RES_TEMPERATURE = '0.7'
    process.env.HF_RES_TOP_P = '0.9'
    repo = new HuggingFaceRepository()
    vi.resetAllMocks()
  })

  it('should call the HuggingFace API and return a valid response', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: vi
        .fn()
        .mockResolvedValue([{ generated_text: 'Mocked text response' }]),
    }

    global.fetch = vi.fn().mockResolvedValue(mockResponse)

    const result = await repo.getResponse(inputToTest)

    expect(fetch).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      headers: expect.objectContaining({
        Authorization: `Bearer ${process.env.HF_API_KEY as string}`,
        'Content-Type': 'application/json',
      }),
      body: expect.stringContaining('Test input'),
    })

    expect(result).toEqual({
      generated_text: expect.any(String),
    })
  })

  it('should throw an error if the API response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue('Internal Server Error'),
    }

    global.fetch = vi.fn().mockResolvedValue(mockResponse)

    await expect(repo.getResponse(inputToTest)).rejects.toThrow(
      'HTTP error! status: 500'
    )
  })

  it('should clean the response text properly', async () => {
    const output = [{ generated_text: 'Summary:\nThis is a test summary.' }]
    const options = {
      summaryPrefix: 'Summary:\n',
      removeInputTemplate: 'Summary:\n',
    }

    const result = await repo.cleanText(output, options)

    expect(result).toBe('This is a test summary.')
  })

  it('should return a cleaned HuggingFace response', async () => {
    const output = [{ generated_text: 'Mocked summary text' }]

    const result = await repo.cleanHFResponse(
      output,
      TSupportedLanguage.English,
      inputToTest.title,
      inputToTest.url,
      inputToTest.topic
    )

    expect(result).toEqual({
      generated_text: expect.any(String),
    })
  })

  it('should return an error message if cleaning the text fails', async () => {
    const output = [{ generated_text: null }]

    const result = await repo.cleanHFResponse(
      output,
      TSupportedLanguage.English,
      inputToTest.title,
      inputToTest.url,
      inputToTest.topic
    )

    expect(result).toEqual({
      generated_text: 'Error: Unable to clean text.',
    })
  })
})
