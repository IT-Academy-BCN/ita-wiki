import { describe, it, expect, afterEach, vi } from 'vitest'
import supertest from 'supertest'
import fs from 'fs'
import { server } from '../globalSetup'
import { swaggeruiUrl } from '../../openapi/config'

const route = `${swaggeruiUrl}/openapi.yaml`
describe('serveOpenApi Middleware', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should serve the openapi.yaml file when the correct path is accessed', async () => {
    const response = await supertest(server).get(route)
    expect(response.status).toBe(200)
    expect(response.type).toBe('text/yaml')
  })
  it('should return 404 if the openapi.yaml file does not exist', async () => {
    vi.spyOn(fs.promises, 'access').mockRejectedValue({
      code: 'ENOENT',
      message:
        "ENOENT: no such file or directory, access 'path/to/your/openapi.yaml'",
    })

    const response = await supertest(server).get(route)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('File does not exist')
  })
})
