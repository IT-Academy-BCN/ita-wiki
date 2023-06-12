import { registry } from '../../registry'
import { z } from '../../zod'
import { NotFoundError, ValidationError } from '../../components/errorSchemas'
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
          schema: ValidationError.openapi({
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
