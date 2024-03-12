import fs from 'fs/promises'
import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { Media, User } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { prisma } from '../../prisma/client'
import { userGetSchema } from '../../schemas'
import { authToken } from '../mocks/ssoHandlers/authToken'

describe('Testing ME endpoint', () => {
  const pathUploadMedia = './static/media'
  let uploadedMedia: Media | null = null
  let user: User | null
  beforeAll(async () => {
    const testImage =
      'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg=='
    const bufferData = Buffer.from(testImage, 'base64')
    await fs.mkdir('./static/media', { recursive: true })
    await fs.writeFile(`${pathUploadMedia}/testImage.png`, bufferData)
    // const savedFile = fs.readFile(`${pathUploadMedia}/testImage.png`)

    user = (await prisma.user.findFirst({
      where: { id: testUserData.admin.id },
    })) as User

    await prisma.media.create({
      data: {
        filePath: `${pathUploadMedia}/testImage.png`,
        mimeType: 'image/png',
        userId: user.id,
      },
    })

    uploadedMedia = await prisma.media.findFirst({
      where: { filePath: `${pathUploadMedia}/testImage.png` },
    })

    await prisma.user.update({
      where: { id: user.id },
      data: { avatarId: uploadedMedia!.id },
    })
  })

  afterAll(async () => {
    await fs.rm(`${pathUploadMedia}/testImage.png`)
    await fs.rmdir(pathUploadMedia, { recursive: true })
    await prisma.media.deleteMany({})
    await prisma.user.update({
      where: { id: user?.id },
      data: { avatarId: null },
    })
  })

  it('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.auth}/me`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })

  it('Should return user avatar, if available, along with user info', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.auth}/me`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    expect(response.status).toBe(200)
    expect(() => userGetSchema.parse(response.body)).not.toThrow()
    expect(response.body).toEqual(
      expect.objectContaining({
        name: testUserData.admin.name,
        status: 'ACTIVE',
        role: testUserData.admin.role,
        avatarId: uploadedMedia!.id,
      })
    )
  })
  checkInvalidToken(`${pathRoot.v1.auth}/me`, 'get')
})
