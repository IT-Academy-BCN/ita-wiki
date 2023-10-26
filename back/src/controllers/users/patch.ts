import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { processMedia } from '../../helpers/processMedia'

export const patchUser: Middleware = async (ctx: Context) => {
  const { id, ...newData } = ctx.request.body
  const media = ctx.file
  let newMediaId: string
  if (media) {
    const { mediaId } = await processMedia(media, id)
    newMediaId = mediaId
    await prisma.user.update({
      where: { id },
      data: { ...newData, avatarId: newMediaId },
    })
  } else {
    await prisma.user.update({
      where: { id },
      data: { ...newData },
    })
  }

  ctx.status = 204
}
