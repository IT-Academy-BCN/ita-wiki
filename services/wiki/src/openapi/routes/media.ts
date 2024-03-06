import { registry } from '../registry'
import { z } from '../zod'
import { pathRoot } from '../../routes/routes'
import { cookieAuth } from '../components/cookieAuth'
import {
  invalidTokenResponse,
  missingTokenResponse,
} from '../components/responses/authMiddleware'

registry.registerPath({
  method: 'post',
  tags: ['media'],
  path: `${pathRoot.v1.media}`,
  description:
    'Allows a user to post media. Media must be an image in a field called "media" and must be <=2MB. Images will be cropped to square and with a max size of 1000x1000px.',
  summary: 'Post media',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      description: 'Image to upload',
      content: {
        'multipart/form-data': {
          schema: {
            properties: {
              media: {
                description: 'File must be a valid image.',
                type: 'string',
                format: 'binary',
              },
            },
          },
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description:
        'Media was uploaded sucessfully. File path for uploaded image is returned.',
      content: {
        'application/json': {
          schema: z.object({
            filePath: z
              .string()
              .openapi({ example: 'static/media/new_media-1684228383338.png' }),
          }),
        },
      },
    },
    401: missingTokenResponse,
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'User not found' }),
          }),
        },
      },
    },
    415: {
      description: 'Unsupported media type. File must be an image.',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'File must be an image' }),
          }),
        },
      },
    },
    422: {
      description: 'Missing media. No image was sent in the request.',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Missing media' }),
          }),
        },
      },
    },
    498: invalidTokenResponse,
    500: {
      description: 'Other error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Database error' }),
          }),
        },
      },
    },
  },
})
