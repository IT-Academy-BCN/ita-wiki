import { NotFoundError } from '../errorSchemas'

export const categoryNotFoundResponse = {
  description: 'Category not found.',
  content: {
    'application/json': {
      schema: NotFoundError.openapi({
        example: {
          message: `Category not found`,
        },
      }),
    },
  },
}
