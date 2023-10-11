import fs from 'fs/promises'
import { existsSync } from 'fs'
import supertest from 'supertest'
import sharp from 'sharp'
import { expect, test, describe, it, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'

const pathUploadMedia = './static/media'

afterAll(async () => {
  const testUser = await prisma.user.findUnique({
    where: { dni: testUserData.user.dni },
  })
  await prisma.media.deleteMany({
    where: { userId: testUser!.id },
  })
})

describe('Testing POST media endpoint', () => {
  test('A user can upload an image, the image exists and the record is created on the DB', async () => {
    const testImage =
      'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg=='
    const bufferData = Buffer.from(testImage, 'base64')
    await fs.mkdir('./static/media', { recursive: true })
    await fs.writeFile(`${pathUploadMedia}/testImage.png`, bufferData)
    const response = await supertest(server)
      .post(`${pathRoot.v1.media}`)
      .set('Cookie', authToken.user)
      .attach('media', `${pathUploadMedia}/testImage.png`)

    // Success uploading
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      filePath: expect.any(String),
    })
    expect(response.body.filePath).toContain('static/media/')

    // Uploaded image exists and is a square
    const uploadedFile = existsSync(response.body.filePath)
    expect(uploadedFile).toBe(true)

    const imageMetadata = await sharp(response.body.filePath).metadata()
    expect(imageMetadata.height).toEqual(imageMetadata.width)

    // Record is created on the DB
    const existsInDB = await prisma.media.findFirst({
      where: { filePath: response.body.filePath },
    })
    expect(existsInDB).not.toBe(null)

    // Delete generated files for this test
    await fs.rm(response.body.filePath)
    await fs.rm(`${pathUploadMedia}/testImage.png`)
  })

  describe('Testing fail cases', () => {
    it('Should fail if no token is provided', async () => {
      const testImage =
        'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg=='
      const bufferData = Buffer.from(testImage, 'base64')
      await fs.writeFile(`${pathUploadMedia}/testImage.png`, bufferData)
      const response = await supertest(server)
        .post(`${pathRoot.v1.media}`)
        .attach('media', `${pathUploadMedia}/testImage.png`)

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Missing token')
      await fs.rm(`${pathUploadMedia}/testImage.png`)
    })
    it('Should clear the token cookie if an invalid token is provided', async () => {
      const testImage =
        'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg=='
      const bufferData = Buffer.from(testImage, 'base64')
      await fs.writeFile(`${pathUploadMedia}/testImage.png`, bufferData)
      const response = await supertest(server)
        .post(`${pathRoot.v1.media}`)
        .set('Cookie', 'token=invalidToken')
        .attach('media', `${pathUploadMedia}/testImage.png`)

      expect(response.status).toBe(498)
      expect(response.body.message).toBe('Token is not valid')
      const cookieHeader = response.headers['set-cookie']
      expect(cookieHeader).toBeDefined()

      const tokenCookie = cookieHeader.find((header: string) =>
        header.startsWith('token=')
      )
      expect(tokenCookie).toBe(
        'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
      )
      await fs.rm(`${pathUploadMedia}/testImage.png`)
    })
    it('Should fail if no file is attached to the request', async () => {
      const response = await supertest(server)
        .post(`${pathRoot.v1.media}`)
        .set('Cookie', authToken.user)

      expect(response.status).toBe(422)
      expect(response.body.message).toBe('Missing media')
    })
    it('Should fail if uploaded media is not an image (a txt for this test)', async () => {
      await fs.writeFile(
        `${pathUploadMedia}/testText.txt`,
        'Test text to upload'
      )
      const response = await supertest(server)
        .post(`${pathRoot.v1.media}`)
        .set('Cookie', authToken.user)
        .attach('media', `${pathUploadMedia}/testText.txt`)

      expect(response.status).toBe(415)
      expect(response.body.message).toBe('File must be an image')
      await fs.rm(`${pathUploadMedia}/testText.txt`)
    })
    it('Should fail if image is bigger than 2MB', async () => {
      // 2MB + 1 byte
      const bufferSize = 2 * 1024 * 1024 + 1
      const buffer = Buffer.alloc(bufferSize)
      await fs.writeFile(`${pathUploadMedia}/testImage.png`, buffer)

      const response = await supertest(server)
        .post(`${pathRoot.v1.media}`)
        .set('Cookie', authToken.user)
        .attach('media', `${pathUploadMedia}/testImage.png`)

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('File too large')
      await fs.rm(`${pathUploadMedia}/testImage.png`)
    })
  })
})
