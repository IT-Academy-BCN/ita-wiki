import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import supertest from 'supertest'
import 'dotenv/config'
import { pathRoot } from '../../routes/routes'
import { server } from '../globalSetup'
import { HuggingFaceRepository } from '../../repository/huggingFace'

global.fetch = vi.fn() as unknown as typeof fetch

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [
      {
        generated_text: 'Resumen: Este es el resumen generado.',
      },
    ],
  } as unknown as Response)
})

const url: string = `${pathRoot.v1.resources}/generate-description`

describe('generateDescription Controller', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 500 if HuggingFace API returns an error', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
      text: async () => '',
    } as unknown as Response)

    const response = await supertest(server).post(`${url}?language=es`).send({
      title: 'Introducción a Node.js',
      url: 'http://example.com',
      topic: 'Desarrollo',
    })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe('HTTP error! status: 500')
  })

  it('should return 422 if required parameters are missing', async () => {
    const response = await supertest(server)
      .post(`${url}`)

      .send({ title: 'Title', url: 'http://example.com', topic: '' })

    expect(response.status).toBe(422)
    expect(response.body.error).toBe('Missing required params')
  })

  it('mocks a POST request to HuggingFace API to generate a description', async () => {
    const language = 'es'
    const expectedResponse = [
      {
        generated_text: 'Resumen: Este es el resumen generado.',
      },
    ]

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => expectedResponse,
    } as unknown as Response)

    process.env.HF_API_ENDPOINT = 'https://api-inference.huggingface.co'
    process.env.HF_API_KEY = 'fake-api-key'
    process.env.HF_RES_MAX_LENGTH = '100'
    process.env.HF_RES_TEMPERATURE = '0.7'
    process.env.HF_RES_TOP_P = '1.0'

    const response = await supertest(server)
      .post(`${url}?language=${language}`)
      .send({
        title: 'Introducción a Node.js',
        url: 'http://example.com',
        topic: 'Desarrollo',
      })

    expect(global.fetch).toHaveBeenCalledTimes(1)

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api-inference.huggingface.co'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Bearer ${process.env.HF_API_KEY as string}`,
          'Content-Type': 'application/json',
        }),
        body: expect.stringContaining(
          JSON.stringify({
            inputs:
              'Por favor, proporciona una resumen detallado de la siguiente fuente Introducción a Node.js, incluyendo los puntos clave, el propósito principal y los conceptos relevantes. Usa un tono claro y accesible. La fuente puede ser encontrada en http://example.com, y su tema es Desarrollo. El resumen debe estar entre 200 y 300 palabras. Resumen:',
            parameters: {
              max_length: Number(process.env.HF_RES_MAX_LENGTH),
              temperature: Number(process.env.HF_RES_TEMPERATURE),
              top_p: Number(process.env.HF_RES_TOP_P),
            },
          })
        ),
      })
    )

    expect(response.status).toBe(200)
    expect(response.body.generated_text).toBe(
      expectedResponse[0].generated_text
    )
  })
  it('should return 500 if cleaning the response fails', async () => {
    const mockRepo = vi
      .spyOn(HuggingFaceRepository.prototype, 'cleanHFResponse')
      .mockRejectedValueOnce(new Error('Cleaning failed'))

    const response = await supertest(server).post(`${url}?language=es`).send({
      title: 'Título',
      url: 'http://example.com',
      topic: 'Desarrollo',
    })

    expect(mockRepo).toHaveBeenCalled()
    expect(response.status).toBe(500)
    expect(response.body.error).toBe('Cleaning failed')
  })
  it('should return 500 if getResponse throws a ServiceFail', async () => {
    const mockRepo = vi
      .spyOn(HuggingFaceRepository.prototype, 'getResponse')
      .mockRejectedValueOnce(new Error('Service failed'))

    const response = await supertest(server).post(`${url}?language=es`).send({
      title: 'Título',
      url: 'http://example.com',
      topic: 'Desarrollo',
    })

    expect(mockRepo).toHaveBeenCalled()
    expect(response.status).toBe(500)
    expect(response.body.error).toBe('Service failed')
  })
})
