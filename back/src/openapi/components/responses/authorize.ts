import { ForbiddenError } from '../errorSchemas'

export const deniedAccessResponse = {
  description: 'Forbidden. Acces denied.',
  content: {
    'application/json': {
      schema: ForbiddenError.openapi({
        example: {
          message: 'Access denied. At least admin access level required.',
        },
      }),
    },
  },
}
