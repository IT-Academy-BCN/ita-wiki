import { registry } from '../../registry'
import { z } from '../../zod'
import { ValidationError } from '../../components/errorSchemas'
import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema } from '../../../schemas'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/id/{resourceId}`,
  summary: 'Returns a resource by its ID',
  description:
    'Takes in a valid resource ID and returns the resource related to it.',
  request: {
    params: z.object({
      resourceId: z.string().trim().min(1).openapi({
        description: 'ID of the resource to be retrieved.',
      }),
    }),
  },
  responses: {
    200: {
      description: 'Resource found',
      content: {
        'application/json': {
          schema: resourceGetSchema,
        },
      },
    },
    400: {
      description: 'Validation error',
      content: {
        'application/json': {
          schema: ValidationError,
        },
      },
    },
    404: {
      description: 'Resource not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Resource not found' }),
          }),
        },
      },
    },
  },
})
