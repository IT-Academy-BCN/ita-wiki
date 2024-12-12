import z from 'zod'
import { registry } from '../../registry'
import { pathRoot } from '../../../routes/routes'
import { cookieAuth } from '../../components/cookieAuth'
import { generateDescriptionSchema } from '../../../schemas/resource/generateDescriptionShema'
import { invalidTokenResponse } from '../../components/responses/authMiddleware'
import { ZodValidationError } from '../../components/errorSchemas'

registry.registerPath({
  method: 'post',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/generate-description`,
  operationId: 'postResourcesGenerateDescription',
  description:
    'Allows an authenticated user to generate a description for a resource. Requires language as a query parameter and title, url, and topic in the request body.',
  summary: 'Generates a description for a resource',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: generateDescriptionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'A description for the resource is generated.',
      content: {
        'application/json': {
          schema: z.object({
            description: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Error fetching data from external API',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({
              example: 'Error fetching data from external API',
            }),
          }),
        },
      },
    },
    401: invalidTokenResponse,
    422: {
      description: 'Missing required parameters',
      content: {
        'application/json': {
          schema: ZodValidationError,
        },
      },
    },
    500: {
      description: 'An error occured while getting the description',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({
              example: 'An error occured while getting the description',
            }),
          }),
        },
      },
    },
  },
})
