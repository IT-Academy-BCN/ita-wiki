import { z } from '../../openapi/zod'

const resourceType = ['BLOG', 'VIDEO', 'TUTORIAL'] as const
const resourceTypeEnum = z.enum(resourceType)

const statusType = ['SEEN', 'NOT_SEEN'] as const
const statusEnum = z.enum(statusType)

export const resourcesGetParamsSchema = z
  .object({
    slug: z
      .string()
      .optional()
      .openapi({
        param: {
          description: 'Slug of the category for which to retrieve resources',
          example: 'react',
        },
        example: 'react',
      }),
    resourceTypes: z
      .union([resourceTypeEnum, z.array(resourceTypeEnum)])
      .optional()
      .openapi({
        param: {
          description: 'Resource types to filter by',
          schema: {
            type: 'array',
            uniqueItems: true,
            items: { type: 'string', enum: [...resourceType] },
          },
        },
        example: 'BLOG',
      }),
    topic: z
      .string()
      .optional()
      .openapi({
        param: {
          description:
            'ID of the topic for which to retrieve resources. If not provided, resources for ALL topics are fetched.',
        },
        example: 'cln2u09xo0037s6wvbf6t9jfg',
      }),
    status: z
      .union([statusEnum, z.array(statusEnum)])
      .optional()
      .openapi({
        param: {
          description: 'Status to filter by',
          schema: {
            type: 'array',
            uniqueItems: true,
            items: { type: 'string', enum: [...statusType] },
          },
        },
        example: 'NOT_SEEN',
      }),
  })
  .strict()

export type TResourcesGetParamsSchema = z.infer<typeof resourcesGetParamsSchema>
