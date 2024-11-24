import Koa, { Middleware } from 'koa'
import { getLanguageInput } from '../../helpers/wiki/getLanguageInput'

export const generateDescription: Middleware = async (ctx: Koa.Context) => {
  const { title, url, topic } = ctx.request.body
  const { language } = ctx.query

  try {
    if (!language) {
      ctx.status = 400
      ctx.body = {
        error: 'Language parameter is required',
      }
      return
    }

    if (!title || !url || !topic) {
      ctx.status = 400
      ctx.body = {
        error: 'All parameters are required',
      }
      return
    }
    const input = getLanguageInput(language as string, title, url, topic)

    const response = await fetch(
      'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: input,
          parameters: {
            max_length: 450,
            temperature: 0.7,
            top_p: 0.95,
          },
        }),
      }
    )
    if (!response.ok) {
      ctx.status = 400
      ctx.body = {
        error: 'Error fetching data from external API',
      }
      return
    }

    const description = await response.json()
    ctx.status = 200
    ctx.body = { description: description[0]?.generated_text.trim() }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: 'An error occured while getting the description' }
  }
}
