import { registry } from '../registry'

// https://github.com/asteasolutions/zod-to-openapi/blob/master/example/index.ts

export const bearerAuth = registry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  }
)
