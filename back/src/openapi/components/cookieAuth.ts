import { registry } from '../registry'

// bearerAuth.ts + https://swagger.io/docs/specification/authentication/cookie-authentication/

export const cookieAuth = registry.registerComponent(
  'securitySchemes',
  'cookieAuth',
  {
    type: 'apiKey',
    in: 'cookie',
    name: 'token'
  }
)
