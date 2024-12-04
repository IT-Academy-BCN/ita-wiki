import { http, HttpResponse } from 'msw'

export const generateTextHandler = http.post(
  process.env.HF_API_ENDPOINT as string,
  async ({ request }) => {
    const { inputs, parameters } = (await request.json()) as {
      inputs: string
      parameters: { max_length: number; temperature: number; top_p: number }
    }

    // Mock response logic
    if (!inputs || !parameters) {
      return HttpResponse.json({ message: 'Invalid request' }, { status: 400 })
    }

    return HttpResponse.json(
      {
        message: `Mocked response for: ${inputs}`,
      },

      { status: 200 }
    )
  }
)
