import Koa, { Middleware } from 'koa'
import { User } from '@prisma/client'
import { MissingParamError } from '../../helpers/errors'
import { processMedia } from '../../helpers/processMedia'

export const postMedia: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const media = ctx.file

  if (!media) throw new MissingParamError('media')

  const { filePath } = await processMedia(media, user.id)

  ctx.body = { filePath }
  ctx.status = 201
}
