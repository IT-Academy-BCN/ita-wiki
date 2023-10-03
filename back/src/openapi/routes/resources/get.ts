import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'
import { resourceGetSchema, resourcesGetParamsSchema } from '../../../schemas'
import { ValidationError } from '../../components/errorSchemas'

registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot.v1.resources}`,
  description:
    'Returns a collection of resources. Filters by resource type, topic name and category slug are optional. Resources that match all filters are fetched.',
  summary: 'Returns a collection of resources',
  parameters: [
    {
      name: 'slug',
      in: 'query',
      required: false,
      description: 'Slug of the category for which to retrieve resources',
      example: 'react',
    },
    {
      name: 'resourceTypes',
      in: 'query',
      required: false,
      description: 'Resource types to filter by',
      example: ['BLOG', 'VIDEO'],
    },
    {
      name: 'topic',
      in: 'query',
      required: false,
      schema: {
        type: 'string',
      },
      description: 'Numeric ID of the topic for which to retrieve resources',
      example: 'cln2u09xo0037s6wvbf6t9jfg',
    },
    {
      name: 'status',
      in: 'query',
      required: false,
      description: 'Status to filter by',
      example: 'SEEN',
    },
  ],
  request: {
    query: resourcesGetParamsSchema,
  },
  responses: {
    200: {
      description: 'Sucessful operation',
      content: {
        'application/json': {
          schema: z.array(resourceGetSchema),
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
                  code: 'invalid_enum_value',
                  received: 'BLO',
                  options: ['BLOG', 'VIDEO', 'TUTORIAL'],
                  path: ['query', 'resourceType'],
                  message:
                    "Invalid enum value. Expected 'BLOG' | 'VIDEO' | 'TUTORIAL', received 'BLO'",
                },
              ],
            },
          }),
        },
      },
    },
  },
})
