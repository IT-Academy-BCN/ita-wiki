import { ServiceUnavailableError } from '../errorSchemas'

export const serviceUnavailableResponse = {
  description: 'The SSO server is not available.',
  content: {
    'application/json': {
      schema: ServiceUnavailableError.openapi({
        example: {
          message: `Service Unavailable`,
        },
      }),
    },
  },
}
