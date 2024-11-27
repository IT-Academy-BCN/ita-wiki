import Koa, { Middleware } from 'koa'
import { HuggingFaceRepository } from '../../repository/huggingFace'
import { getLanguageInput } from '../../helpers/getLanguageInput'
import { TSupportedLanguage } from '../../db/knexTypes'
import {
  DefaultError,
  MissingParamError,
  ServiceFail,
} from '../../helpers/errors'

export const generateDescription: Middleware = async (ctx: Koa.Context) => {
  const { title, url, topic } = ctx.request.body
  const { language } = ctx.query
  const huggingFaceRepository = new HuggingFaceRepository()
  try {
    if (!title || !url || !topic || !language) {
      throw new MissingParamError('required params')
    }

    const input = getLanguageInput(
      language as TSupportedLanguage,
      title,
      url,
      topic
    )
    const languageInput = language as TSupportedLanguage

    const response = await huggingFaceRepository.getResponse({
      input,
      title,
      url,
      topic,
      language: languageInput,
    })

    const cleanResponse = await huggingFaceRepository.cleanHFResponse(
      [{ generated_text: response.generated_text }],
      language as TSupportedLanguage,
      title,
      url,
      topic
    )

    if (!cleanResponse || !cleanResponse.generated_text) {
      throw new ServiceFail('Failed to process the response from external API')
    }

    ctx.status = 200
    ctx.body = cleanResponse
  } catch (error: any) {
    if (error instanceof DefaultError) {
      ctx.status = error.status
      ctx.body = { error: error.message }
    } else {
      ctx.status = 500
      ctx.body = { error: error.message }
    }
  }
}
