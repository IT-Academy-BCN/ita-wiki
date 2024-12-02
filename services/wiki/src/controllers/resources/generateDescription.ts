import Koa, { Middleware } from 'koa'
import { HuggingFaceRepository } from '../../repository/huggingFace'
import { getLanguageInput } from '../../helpers/getLanguageInput'
import { DefaultError } from '../../helpers/errors'
import generateHFDescriptionSchema from '../../schemas/huggingFace/generateHFDescription'

export const generateDescription: Middleware = async (ctx: Koa.Context) => {
  const { title, url, topic, language } = generateHFDescriptionSchema.parse(
    ctx.request.body
  )
  const huggingFaceRepository = new HuggingFaceRepository()
  try {
    const input = getLanguageInput(language, title, url, topic)

    const response = await huggingFaceRepository.getResponse({
      input,
      title,
      url,
      topic,
      language,
    })

    ctx.status = 200
    ctx.body = response
  } catch (error: any) {
    throw new DefaultError(error, 'Failed to generate description')
  }
}
