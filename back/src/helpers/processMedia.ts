import sharp from 'sharp'
import slugify from 'slugify'
import multer from '@koa/multer'
import { prisma } from '../prisma/client'

export const processMedia = async (media: multer.File, userId: string) => {
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

  const newMedia = await prisma.media.create({
    data: {
      mimeType: media.mimetype,
      filePath,
      userId: userId.toString(),
    },
  })

  return { mediaId: newMedia.id, filePath: newMedia.filePath }
}
