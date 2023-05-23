import { pathRoot } from '../../routes/routes'
import { registry } from '../registry'
import { resourceSchema } from '../../schemas'
import { z } from '../zod'

registry.registerPath({
  method: 'get',
  tags: ['favorites'],
  path: `${pathRoot.v1.favorites}/by-user/:userId`,
  description:
    'Takes a user Id and returns the list of favorites saved by that user',
  summary: 'Returns favorite resources by user',
  parameters: [
    {
      name: 'userId',
      in: 'path',
      required: true,
      description: 'ID of the user for which to retrieve favorite resources',
    },
    {
      name: 'categorySlug',
      in: 'path',
      required: true,
      description:
        'Slug of the category for which to retrieve favorite resources',
      example: 'node',
    },
  ],
  responses: {
    200: {
      description: 'Favorite resources retireved  successfully.',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              resource: resourceSchema.omit({
                topics: true,
              }),
            })
          ),
        },
      },
    },
    400: {
      description: 'User ID is required',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'UserId is required' }),
          }),
        },
      },
    },
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
  },
})
