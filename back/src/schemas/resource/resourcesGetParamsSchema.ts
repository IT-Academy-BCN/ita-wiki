import { RESOURCE_TYPE } from '@prisma/client'
import { z } from '../../openapi/zod'

const resourceTypeEnum = z.nativeEnum(RESOURCE_TYPE)

const status = ['SEEN', 'NOT_SEEN'] as const
const statusEnum = z.enum(status)

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
            items: { type: 'string', enum: [...Object.values(RESOURCE_TYPE)] },
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
            items: { type: 'string', enum: [...statusEnum.options] },
          },
        },
        example: 'NOT_SEEN',
      }),
  })
  .strict()

export type TResourcesGetParamsSchema = z.infer<typeof resourcesGetParamsSchema>
