import Koa, { Middleware } from 'koa'
import { HuggingFaceRepository } from '../../repository/huggingFace/repo'
import { getLanguageInput } from '../../helpers/getLanguageInput'
import generateHFDescriptionSchema from '../../schemas/huggingFace/generateHFDescription'

export const generateDescription: Middleware = async (ctx: Koa.Context) => {
  const { title, url, topic, language } = generateHFDescriptionSchema.parse(
    ctx.request.body
  )

  const huggingFaceRepository = new HuggingFaceRepository()

  const input = getLanguageInput(language, title, url, topic)

  const response = await huggingFaceRepository.getResponse(input)

  ctx.status = 200
  ctx.body = response
}
