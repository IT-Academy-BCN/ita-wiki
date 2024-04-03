import { registry } from '../../registry'
import { z } from '../../zod'
import {
  NotFoundError,
  ZodValidationError,
} from '../../components/errorSchemas'
import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema } from '../../../schemas'
import { resourceId } from '../../components/paramSchemas'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}/{resourceId}`,
  summary: 'Returns a resource by its ID',
  description:
    'Takes in a valid resource ID and returns the resource related to it.',
  request: {
    params: z.object({
      resourceId,
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
          schema: ZodValidationError.openapi({
            example: {
              message: [
                {
                  code: 'invalid_string',
                  validation: 'cuid',
                  path: ['params', 'resourceId'],
                  message: 'Invalid cuid',
                },
              ],
            },
          }),
        },
      },
    },
    404: {
      description: 'Resource not found',
      content: {
        'application/json': {
          schema: NotFoundError.openapi({
            example: { message: 'Resource not found' },
          }),
        },
      },
    },
  },
})
