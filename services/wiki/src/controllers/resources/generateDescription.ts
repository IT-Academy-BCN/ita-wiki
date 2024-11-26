import Koa, { Middleware } from 'koa'
import { HuggingFaceRepository } from '../../repository/huggingFace'
import { getLanguageInput } from '../../helpers/getLanguageInput'

export const generateDescription: Middleware = async (ctx: Koa.Context) => {
  const { title, url, topic } = ctx.request.body
  const { language } = ctx.query
  const huggingFaceRepository = new HuggingFaceRepository()
  try {
    if (
      !title ||
      !url ||
      !topic ||
      title === '' ||
      url === '' ||
      topic === ''
    ) {
      ctx.status = 400
      ctx.body = { error: 'All parameters are required' }
      return
    }
    if (!language || typeof language !== 'string') {
      ctx.status = 422
      ctx.body = {
        error: 'Language parameter is required',
      }
      return
    }

    const input = getLanguageInput(language, title, url, topic)
    const response = await huggingFaceRepository.getResponse({
      input,
      title,
      url,
      topic,
      language,
    })
    if (!response || response.status >= 400) {
      ctx.status = 500
      ctx.body = {
        message: 'An error occurred while getting the description',
        details: `Error details from HuggingFace API: ${response.status} `,
      }
      return
    }

    const cleanResponse = await huggingFaceRepository.cleanHFResponse(
      [{ generated_text: response.generated_text }],
      language,
      title,
      url,
      topic
    )

    if (!cleanResponse || !cleanResponse.generated_text.trim()) {
      ctx.status = 500
      ctx.body = {
        error: 'Failed to extract summary',
        details: 'No valid summary prefix found in response text.',
      }
      return
    }

    ctx.status = 200
    ctx.body = cleanResponse
  } catch (error: any) {
    ctx.status = 500
    ctx.body = {
      message: 'An error occurred while getting the description',
      details: error.message,
    }
  }
}
