import 'dotenv/config'
import { TResponse } from '../../db/knexTypes'
import { HTTPError } from '../../helpers/errors'

export class HuggingFaceRepository {
  private apiEndpoint: string
  private apiKey: string

  constructor() {
    this.apiEndpoint = process.env.HF_API_ENDPOINT as string
    this.apiKey = process.env.HF_API_KEY as string
  }

  async getResponse(input: string): Promise<TResponse> {
    const fetchResponse = await fetch(`${this.apiEndpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: input,
        parameters: {
          max_length: Number(process.env.HF_RES_MAX_LENGTH),
          temperature: Number(process.env.HF_RES_TEMPERATURE),
          top_p: Number(process.env.HF_RES_TOP_P),
          return_full_text: false,
        },
      }),
    })

    if (!fetchResponse.ok) {
      throw new HTTPError(
        fetchResponse.status,
        fetchResponse.statusText || 'Unknown error'
      )
    }

    const response = await fetchResponse.json()

    return response as unknown as TResponse
  }
}
