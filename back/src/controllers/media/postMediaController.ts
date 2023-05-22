import Koa, { Middleware } from 'koa'
import sharp from 'sharp'
import slugify from 'slugify'
import { prisma } from '../../prisma/client'
import { MissingParamError } from '../../helpers/errors'

export const postMedia: Middleware = async (ctx: Koa.Context) => {
  const { userId } = ctx.params
  const media = ctx.file

  if (!media) throw new MissingParamError('media')

  const totalName = media.originalname.split('.')
  const originalFileName = totalName[0]
  const originalExtension = totalName[1]
  const newFileName = `${slugify(originalFileName, {
    lower: true,
  })}-${Date.now().toString()}.${originalExtension}`
  const filePath = `static/media/${newFileName}`

  const metadata = await sharp(media.buffer).metadata()
  const originalSize = [metadata.height as number, metadata.width as number]
  // Check the samllest edge to crop to square, and at max to be 1000x1000
  let smallSize = Math.min(...originalSize)
  smallSize = smallSize < 1000 ? smallSize : 1000

  await sharp(media.buffer)
    .resize(smallSize, smallSize, { fit: sharp.fit.cover })
    .toFile(filePath)

  await prisma.media.create({
    data: {
      mimeType: media.mimetype,
      filePath,
      userId,
    },
  })

  ctx.body = { filePath }
  ctx.status = 201
}
