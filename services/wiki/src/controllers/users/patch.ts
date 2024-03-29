import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { processMedia } from '../../helpers/processMedia'
import { ssoHandler } from '../../helpers'
import { UserPatchSchema } from '../../schemas/users/userPatchSchema'

export const patchUser: Middleware = async (ctx: Context) => {
  const { id, ...newData } = ctx.request.body as UserPatchSchema
  const authToken = ctx.cookies.get('authToken') as string
  await ssoHandler.updateUser({ id, authToken, ...newData })
  const media = ctx.file
  let newMediaId: string
  if (media) {
    const { mediaId } = await processMedia(media, id)
    newMediaId = mediaId
    await prisma.user.update({
      where: { id },
      data: { avatarId: newMediaId },
    })
  }

  ctx.status = 204
}
